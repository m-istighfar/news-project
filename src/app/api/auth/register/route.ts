import { NextResponse } from "next/server";
import { ApiResponseBuilder } from "@/lib/api/response";
import { hashPassword } from "@/lib/auth/password-utils";
import { prisma } from "@/lib/db/prisma";
import { RegisterSchema } from "@/lib/validations/auth";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const validationResult = RegisterSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const { email, password, name } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return ApiResponseBuilder.conflict("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return ApiResponseBuilder.success(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      "User registered successfully"
    );
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}
