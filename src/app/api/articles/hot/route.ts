import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const hotArticles = await prisma.article.findMany({
      where: {
        isHot: true,
        status: "published",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return ApiResponseBuilder.success(hotArticles);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
