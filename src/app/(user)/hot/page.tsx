"use client";

import { useArticles } from "@/services/article/useArticles";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { generatePlaceholderDataURL } from "@/components/ui/placeholder-image";
import { Loader } from "@/components/ui/loader";

export default function HotNewsPage() {
  const { data: articles, isLoading } = useArticles(1, "published", undefined, undefined, "true");
  const hotNews = articles?.items || [];

  return (
    <main className="flex-1">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Berita Utama</h1>
          <p className="text-muted-foreground">Kumpulan berita terpopuler dan terkini untuk Anda</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotNews.map((news) => (
              <Link
                href={`/news/${news.slug}`}
                key={news.id}
                className="group bg-card hover:bg-accent/5 rounded-lg overflow-hidden border transition-colors"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={news.imageUrl || generatePlaceholderDataURL(news.title, 600, 338)}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <Badge className="mb-2 bg-secondary/10 text-secondary hover:bg-secondary/20">
                    {news.category.name}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(news.createdAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
