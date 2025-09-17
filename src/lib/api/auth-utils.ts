import { NextResponse } from "next/server";
import { ApiResponseBuilder } from "./response";

export function verifyAuthentication(request: Request): NextResponse | null {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return ApiResponseBuilder.unauthorized("User not authenticated");
  }

  return null;
}
