import { verifyAuthentication } from "@/lib/api/auth-utils";
import { ApiResponseBuilder } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";
import { CategorySchema } from "@/lib/validations/category";

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export async function GET(request: Request) {
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
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const totalItems = await prisma.category.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    const categories = await prisma.category.findMany({
      where,
      orderBy: {
        name: "asc",
      },
      skip,
      take: limit,
    });

    const links = {
      prev: page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
      next: page < totalPages ? `/api/categories?page=${page + 1}&limit=${limit}` : null,
    };

    if (search) {
      if (links.prev) links.prev += `&search=${search}`;
      if (links.next) links.next += `&search=${search}`;
    }

    return ApiResponseBuilder.successWithPagination(categories, page, limit, totalItems, links);
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}

export async function POST(request: Request) {
  const authResponse = verifyAuthentication(request);
  if (authResponse) return authResponse;

  try {
    const body = await request.json();

    const validationResult = CategorySchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponseBuilder.badRequest(validationResult.error);
    }

    let { name, slug } = validationResult.data;

    slug = slug || generateSlug(name);

    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name: { equals: name, mode: "insensitive" } }, { slug: { equals: slug, mode: "insensitive" } }],
      },
    });

    if (existing) {
      return ApiResponseBuilder.conflict("Category with this name or slug already exists");
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return ApiResponseBuilder.success(category, "Category created successfully");
  } catch (error) {
    return ApiResponseBuilder.handleError(error);
  }
}
