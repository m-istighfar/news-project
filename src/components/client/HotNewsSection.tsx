import Image from "next/image";
import { User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/client";
import { useArticles } from "@/services/article/useArticles";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { generatePlaceholderDataURL } from "@/components/ui/placeholder-image";
import sanitizeHtml from "sanitize-html";

interface HotNewsSectionProps {
  viewAllLink?: string;
}

function sanitizeContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: ["p", "b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href", "target"],
    },
  });
}

export function HotNewsSection({ viewAllLink = "/hot" }: HotNewsSectionProps) {
  const { data } = useArticles(1, "published", undefined, undefined, "true");
  const hotNews = data?.items.slice(0, 4) || [];
  const mainNews = hotNews[0];
  const secondaryNews = hotNews.slice(1);

  return (
    <section className="py-10 bg-secondary/10">
      <div className="container">
        <SectionHeader title="Berita Utama" viewAllLink={viewAllLink} color="secondary" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hot News */}
          {mainNews && (
            <Link
              href={`/news/${mainNews.slug}`}
              className="lg:col-span-2 relative group overflow-hidden rounded-xl shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src={mainNews.imageUrl || generatePlaceholderDataURL("Hot News", 1200, 600)}
                  alt={mainNews.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 overlay-dark" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <Badge className="mb-3 bg-secondary hover:bg-secondary/90 text-white">{mainNews.category.name}</Badge>
                  <h3 className="text-xl sm:text-3xl font-bold mb-3 leading-tight">{mainNews.title}</h3>
                  <div
                    className="text-sm text-gray-200 mb-4 line-clamp-2 max-w-3xl"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeContent(mainNews.content),
                    }}
                  />
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {mainNews.author.name || mainNews.author.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDate(mainNews.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Secondary Hot News */}
          <div className="space-y-6">
            {secondaryNews.map((news) => (
              <Link
                href={`/news/${news.slug}`}
                key={news.id}
                className="flex gap-4 group card-hover bg-card rounded-lg p-3 border"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={news.imageUrl || generatePlaceholderDataURL(`News`, 300, 300)}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <Badge className="w-fit mb-2 bg-secondary hover:bg-secondary/90 text-white">
                    {news.category.name}
                  </Badge>
                  <h3 className="font-bold line-clamp-2 group-hover:text-secondary transition-colors">{news.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDate(news.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
