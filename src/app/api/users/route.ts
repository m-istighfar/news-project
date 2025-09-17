import { verifyAuthentication } from "@/lib/api/auth-utils";
import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";
import { UserCreateSchema } from "@/lib/validations/user";
import { hashPassword } from "@/lib/auth/password-utils";

export async function GET(request: Request) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const totalData = await prisma.user.count({ where });
    const totalPages = Math.ceil(totalData / limit);

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
      skip,
      take: limit,
    });

    const links = {
      prev: page > 1 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
      next: page < totalPages ? `/api/users?page=${page + 1}&limit=${limit}` : null,
    };

    if (search) {
      if (links.prev) links.prev += `&search=${search}`;
      if (links.next) links.next += `&search=${search}`;
    }

    return ApiResponseBuilder.successWithPagination(users, page, limit, totalData, links);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function POST(request: Request) {
  const authResult = verifyAuthentication(request);
  if (authResult) return authResult;

  try {
    const body = await request.json();

    const validationResult = UserCreateSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return ApiResponseBuilder.conflict("Email sudah terdaftar");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return ApiResponseBuilder.success(user, "User created successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
