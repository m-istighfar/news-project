import { ApiResponseBuilder } from "@/lib/api/response";
import { verifyPassword } from "@/lib/auth/password-utils";
import { prisma } from "@/lib/db/prisma";
import { LoginSchema } from "@/lib/validations/auth";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const validationResult = LoginSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const { email, password } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return ApiResponseBuilder.unauthorized("Invalid credentials");
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return ApiResponseBuilder.unauthorized("Invalid credentials");
    }

    const payload = { userId: user.id };
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
    const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(secret);

    return ApiResponseBuilder.success(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      "Login successful"
    );
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}
