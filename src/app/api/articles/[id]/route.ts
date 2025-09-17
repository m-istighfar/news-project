import { verifyAuthentication } from "@/lib/api/auth-utils";
import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";
import { deleteImage, saveImage } from "@/lib/utils/image-storage";
import { ArticleUpdateSchema } from "@/lib/validations/article";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });

    if (!article) {
      return ApiResponseBuilder.notFound("Article not found");
    }

    return ApiResponseBuilder.success(article);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const { id } = params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const status = formData.get("status") as "draft" | "published";
    const image = formData.has("image") ? (formData.get("image") as File | null) : null;

    const validationResult = ArticleUpdateSchema.safeParse({
      title,
      content,
      categoryId,
      status,
      image: formData.has("image") ? image : undefined,
    });

    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return ApiResponseBuilder.notFound("Article not found");
    }

    let slug: string | undefined;
    if (title && title !== existingArticle.title) {
      slug = title.toLowerCase().replace(/\s+/g, "-");

      const slugExists = await prisma.article.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (slugExists) {
        return ApiResponseBuilder.conflict("An article with this title already exists");
      }
    }

    let imageUrl = existingArticle.imageUrl;
    if (image) {
      if (existingArticle.imageUrl) {
        await deleteImage(existingArticle.imageUrl);
      }
      imageUrl = await saveImage(image, title);
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        categoryId,
        status,
        imageUrl,
        publishedAt: status === "published" && !existingArticle.publishedAt ? new Date() : existingArticle.publishedAt,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });

    return ApiResponseBuilder.success(article, "Article updated successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const { id } = params;

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return ApiResponseBuilder.notFound("Article not found");
    }

    if (article.imageUrl) {
      await deleteImage(article.imageUrl);
    }

    await prisma.article.delete({
      where: { id },
    });

    return ApiResponseBuilder.success(null, "Article deleted successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const { id } = params;
    const { isHot } = await request.json();

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return ApiResponseBuilder.notFound("Article not found");
    }

    if (existingArticle.status !== "published") {
      return ApiResponseBuilder.badRequest("Only published articles can be marked as hot news");
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        isHot: isHot ?? !existingArticle.isHot,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });

    return ApiResponseBuilder.success(article, `Article ${article.isHot ? "marked as" : "removed from"} hot news`);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}
