import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    const article = await prisma.article.findUnique({
      where: { slug },
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
