"use client";

import { useArticles } from "@/services/article/useArticles";
import { NewsCard } from "@/components/client/news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime } from "@/utils/date";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function NewsContent() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || undefined;

  const { data: articles, isLoading } = useArticles(currentPage, "published", undefined, searchQuery);

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  };

  const pages = generatePagination(currentPage, articles?.total_pages || 1);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="py-12">
      <div className="mb-12">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-6 w-[450px]" />
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-3">Semua Berita</h1>
            <p className="text-lg text-muted-foreground">Kumpulan berita terbaru dari berbagai kategori</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          Array(12)
            .fill(0)
            .map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-xl" />)
        ) : articles?.items && articles.items.length > 0 ? (
          articles.items.map((article) => (
            <NewsCard
              key={article.id}
              id={parseInt(article.id)}
              title={article.title}
              excerpt={article.content}
              category={article.category?.name || ""}
              image={article.imageUrl || ""}
              publishedAt={formatRelativeTime(article.publishedAt || "")}
              categoryColor="primary"
              slug={article.slug}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada berita tersedia</p>
          </div>
        )}
      </div>

      {articles?.total_pages && articles.total_pages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent className="space-x-1">
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                aria-disabled={currentPage <= 1}
                className={`rounded-md transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>

            {pages.map((page, i) => (
              <PaginationItem key={i}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis className="text-muted-foreground" />
                ) : (
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={currentPage === page}
                    className={`rounded-md transition-colors ${
                      currentPage === page ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : "hover:bg-muted/30"
                    }`}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={currentPage < (articles.total_pages || 1) ? createPageURL(currentPage + 1) : "#"}
                aria-disabled={currentPage >= (articles.total_pages || 1)}
                className={`rounded-md transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                  currentPage >= (articles.total_pages || 1) ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default function AllNewsPage() {
  return (
    <main className="flex-1">
      <div className="container">
        <Suspense
          fallback={
            <div className="py-12">
              <div className="space-y-3 mb-12">
                <Skeleton className="h-12 w-[300px]" />
                <Skeleton className="h-6 w-[450px]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
                  ))}
              </div>
            </div>
          }
        >
          <NewsContent />
        </Suspense>
      </div>
    </main>
  );
}
