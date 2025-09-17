import { verifyAuthentication } from "@/lib/api/auth-utils";
import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";
import { saveImage } from "@/lib/utils/image-storage";
import { ArticleCreateSchema } from "@/lib/validations/article";
import { jwtVerify } from "jose";

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const isHot = searchParams.get("isHot");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;
    if (isHot) where.isHot = isHot === "true";
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const [totalData, publishedCount, draftCount] = await Promise.all([
      prisma.article.count({ where }),
      prisma.article.count({ where: { ...where, status: "published" } }),
      prisma.article.count({ where: { ...where, status: "draft" } }),
    ]);

    const totalPages = Math.ceil(totalData / limit);

    const articles = await prisma.article.findMany({
      where,
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
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const links = {
      prev: page > 1 ? `/api/articles?page=${page - 1}&limit=${limit}` : null,
      next: page < totalPages ? `/api/articles?page=${page + 1}&limit=${limit}` : null,
    };

    if (search) {
      if (links.prev) links.prev += `&search=${search}`;
      if (links.next) links.next += `&search=${search}`;
    }
    if (status) {
      if (links.prev) links.prev += `&status=${status}`;
      if (links.next) links.next += `&status=${status}`;
    }
    if (categoryId) {
      if (links.prev) links.prev += `&categoryId=${categoryId}`;
      if (links.next) links.next += `&categoryId=${categoryId}`;
    }
    if (isHot) {
      if (links.prev) links.prev += `&isHot=${isHot}`;
      if (links.next) links.next += `&isHot=${isHot}`;
    }

    return ApiResponseBuilder.successWithPagination(articles, page, limit, totalData, links, {
      publishedCount,
      draftCount,
    });
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function POST(request: Request) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const status = formData.get("status") as "draft" | "published";
    const image = formData.get("image") as File | null;
    const addWatermark = formData.get("addWatermark") !== "false";

    if (image) {
      if (!(image instanceof File)) {
        return ApiResponseBuilder.badRequest({ message: "Invalid file input: not a File instance" });
      }
      if (typeof image === "string" || !("arrayBuffer" in image)) {
        return ApiResponseBuilder.badRequest({ message: "Invalid file input: missing arrayBuffer method" });
      }
      if (!image.type.startsWith("image/")) {
        return ApiResponseBuilder.badRequest({ message: "Invalid file type: must be an image" });
      }
    }

    const validationResult = ArticleCreateSchema.safeParse({
      title,
      content,
      categoryId,
      status,
      image: image as File | null,
    });

    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return ApiResponseBuilder.badRequest("Invalid category ID");
    }

    const slug = generateSlug(title);

    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    });

    if (existingArticle) {
      return ApiResponseBuilder.conflict("An article with this title already exists");
    }

    const token = request.headers.get("authorization")?.split(" ")[1] || "";
    const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret"));
    const userId = decoded.payload.userId as string;

    let imageUrl: string | undefined;
    if (image) {
      imageUrl = await saveImage(image, title, addWatermark);
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        status,
        imageUrl,
        authorId: userId,
        categoryId,
        publishedAt: status === "published" ? new Date() : null,
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

    return ApiResponseBuilder.success(article, "Article created successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
