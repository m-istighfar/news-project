import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ApiResponse, DataPaginate } from "@/types/interface";

function parseValidationMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return error.errors
      .map((err) => {
        const field = err.path.join(".");
        return `${field}: ${err.message}`;
      })
      .join(", ");
  }
  return typeof error === "string" ? error : "Validation failed";
}

export class ApiResponseBuilder {
  private static createResponse<T>(status: number, message: string, data: T): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
      {
        status,
        message,
        data,
      },
      { status }
    );
  }

  private static createPaginatedResponse<T>(
    status: number,
    message: string,
    data: DataPaginate<T>
  ): NextResponse<ApiResponse<DataPaginate<T>>> {
    return NextResponse.json(
      {
        status,
        message,
        data,
      },
      { status }
    );
  }

  static success<T>(data: T, message: string = "Success"): NextResponse<ApiResponse<T>> {
    return this.createResponse(200, message, data);
  }

  static successWithPagination<T>(
    items: T[],
    page: number,
    limit: number,
    totalItems: number,
    links?: { prev: string | null; next: string | null },
    meta?: Record<string, any>
  ): NextResponse<ApiResponse<DataPaginate<T>>> {
    const totalPages = Math.ceil(totalItems / limit);

    const paginatedData: DataPaginate<T> = {
      items,
      total_items: totalItems,
      page,
      total_pages: totalPages,
      links: links || {
        prev: page > 1 ? `/api/data?page=${page - 1}` : null,
        next: page < totalPages ? `/api/data?page=${page + 1}` : null,
      },
      meta, // Add meta to the paginated data
    };

    return this.createPaginatedResponse(200, "Success", paginatedData);
  }

  static error(message: string = "Internal server error"): NextResponse<ApiResponse<null>> {
    return this.createResponse(500, message, null);
  }

  static badRequest(error: unknown = "Bad request"): NextResponse<ApiResponse<null>> {
    const message = parseValidationMessage(error);
    return this.createResponse(400, message, null);
  }

  static unauthorized(message: string = "Unauthorized"): NextResponse<ApiResponse<null>> {
    return this.createResponse(401, message, null);
  }

  static forbidden(message: string = "Forbidden"): NextResponse<ApiResponse<null>> {
    return this.createResponse(403, message, null);
  }

  static notFound(message: string = "Not found"): NextResponse<ApiResponse<null>> {
    return this.createResponse(404, message, null);
  }

  static conflict(message: string = "Conflict"): NextResponse<ApiResponse<null>> {
    return this.createResponse(409, message, null);
  }

  static handleError(error: unknown): NextResponse<ApiResponse<null>> {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return this.conflict("Data dengan nilai yang sama sudah ada");
        case "P2003":
          return this.conflict("Data ini masih digunakan oleh data lain");
        case "P2025":
          return this.notFound("Data tidak ditemukan");
        default:
          return this.error("Terjadi kesalahan pada database");
      }
    }

    if (error instanceof PrismaClientValidationError) {
      return this.error("Data tidak valid");
    }

    if (error instanceof Error) {
      return this.error(error.message);
    }

    return this.error("Terjadi kesalahan pada server");
  }
}
