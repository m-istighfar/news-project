import { verifyAuthentication } from "@/lib/api/auth-utils";
import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";
import { UserUpdateSchema } from "@/lib/validations/user";
import { hashPassword } from "@/lib/auth/password-utils";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const authResult = verifyAuthentication(_);
  if (authResult) return authResult;

  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    return ApiResponseBuilder.success(user);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const { id } = params;
    const body = await request.json();

    const validationResult = UserUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return ApiResponseBuilder.notFound("User not found");
    }

    if (body.email && body.email !== existingUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: body.email,
          NOT: { id },
        },
      });

      if (emailExists) {
        return ApiResponseBuilder.conflict("Email sudah digunakan");
      }
    }

    let hashedPassword;
    if (body.password) {
      hashedPassword = await hashPassword(body.password);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        ...(hashedPassword && { password: hashedPassword }),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return ApiResponseBuilder.success(user, "User updated successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    const articlesCount = await prisma.article.count({
      where: { authorId: id },
    });

    if (articlesCount > 0) {
      return ApiResponseBuilder.conflict("Cannot delete user with existing articles");
    }

    await prisma.user.delete({
      where: { id },
    });

    return ApiResponseBuilder.success(null, "User deleted successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
