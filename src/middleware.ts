import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// Protected API routes
const protectedApiRoutes = [
  "/api/categories",
  "/api/categories/[id]",
  "/api/articles/[id]",
  "/api/articles",
  "/api/users",
  "/api/users/[id]",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Check if it's a dashboard route
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Allow public API GET requests except for users
  if (pathname.startsWith("/api") && method === "GET" && !pathname.startsWith("/api/users")) {
    return NextResponse.next();
  }

  // Check if route needs protection
  const isProtectedApiRoute = protectedApiRoutes.some((route) => pathname.startsWith(route));
  if (!isProtectedApiRoute && !isDashboardRoute) {
    return NextResponse.next();
  }

  // Get token from cookies for dashboard routes or Authorization header for API routes
  const token = isDashboardRoute
    ? request.cookies.get("token")?.value
    : request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.json(
      {
        success: false,
        message: "Token tidak ditemukan",
      },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const decoded = { userId: payload.userId as string };

    // Add user data to headers
    const headers = new Headers(request.headers);
    headers.set("x-user-id", decoded.userId);

    return NextResponse.next({ headers });
  } catch (error) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? "Tanda tangan token tidak valid" : "Token tidak valid atau sudah kadaluarsa",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    // Protected API routes
    "/api/categories/:path*",
    "/api/articles/:path*",
    "/api/users/:path*",
    // Dashboard routes
    "/dashboard/:path*",
    "/berita/:path*",
    "/kategori/:path*",
    "/users/:path*",
  ],
};
