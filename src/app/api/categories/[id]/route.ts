import { verifyAuthentication } from "@/lib/api/auth-utils";
import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";
import { CategoryUpdateSchema } from "@/lib/validations/category";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return ApiResponseBuilder.notFound("Category not found");
    }

    return ApiResponseBuilder.success(category);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authResponse = verifyAuthentication(request);
  if (authResponse) return authResponse;

  try {
    const { id } = params;
    const body = await request.json();

    const validationResult = CategoryUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const { name, slug } = validationResult.data;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return ApiResponseBuilder.notFound("Category not found");
    }

    if (name || slug) {
      const existing = await prisma.category.findFirst({
        where: {
          OR: [{ name: { equals: name, mode: "insensitive" } }, { slug: { equals: slug, mode: "insensitive" } }],
          NOT: { id },
        },
      });

      if (existing) {
        return ApiResponseBuilder.conflict("Category with this name or slug already exists");
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug },
    });

    return ApiResponseBuilder.success(updatedCategory, "Category updated successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authResponse = verifyAuthentication(request);
  if (authResponse) return authResponse;

  try {
    const { id } = params;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return ApiResponseBuilder.notFound("Category not found");
    }

    await prisma.category.delete({
      where: { id },
    });

    return ApiResponseBuilder.success(null, "Category deleted successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}
