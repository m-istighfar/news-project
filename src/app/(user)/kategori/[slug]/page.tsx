"use client";

import { useArticles } from "@/services/article/useArticles";
import { useCategories } from "@/services/category/useCategories";
import { NewsCard } from "@/components/client/news-card";
import { Loader } from "@/components/ui/loader";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { formatRelativeTime } from "@/utils/date"; // Add this import
import { Skeleton } from "@/components/ui/skeleton"; // Add this import

export default function CategoryArticlesPage() {
  const { slug } = useParams();
  const { data: categories } = useCategories(1, undefined, 100);
  const currentCategory = categories?.items.find((cat) => cat.slug === slug);

  const { data: articles, isLoading } = useArticles(1, "published", currentCategory?.id);

  return (
    <main className="flex-1">
      <div className="container">
        <div className="py-12">
          <div className="mb-12">
            <Link
              href="/kategori"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Kembali ke Kategori
            </Link>
            {!currentCategory ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-[250px]" />
                <Skeleton className="h-6 w-[400px]" />
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-3 text-foreground">{currentCategory.name}</h1>
                <p className="text-lg text-muted-foreground">Berita terbaru dalam kategori {currentCategory.name}</p>
              </>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : articles?.items && articles.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.items.map((article) => (
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
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">Belum ada berita dalam kategori ini</p>
              <Link href="/news" className="text-sm font-medium text-primary hover:underline">
                Lihat semua berita
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
