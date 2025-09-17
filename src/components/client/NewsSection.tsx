"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader, NewsCard } from "@/components/client";
import { useArticles } from "@/services/article/useArticles";
import { formatRelativeTime } from "@/utils/date";
import { Category } from "@/types/category";
import { generatePlaceholderDataURL } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";
import sanitizeHtml from "sanitize-html";

interface NewsSectionProps {
  title?: string;
  viewAllLink?: string;
  color?: "primary" | "secondary" | "accent" | "success";
  categories?: Category[];
  isCategoriesLoading?: boolean;
}

export function NewsSection({
  title = "Berita Terbaru",
  viewAllLink = "/semua-berita",
  color = "primary",
  categories = [],
  isCategoriesLoading = false,
}: NewsSectionProps) {
  const [currentTab, setCurrentTab] = useState("all");
  const limitedCategories = categories?.slice(0, 4) || [];

  const { data: articles, isLoading } = useArticles(
    1,
    "published",
    currentTab !== "all" ? limitedCategories.find((cat) => cat.slug === currentTab)?.id : undefined
  );

  const limitedArticles = articles?.items.slice(0, 8) || [];

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  function sanitizeContent(content: string) {
    return sanitizeHtml(content, {
      allowedTags: ["p", "b", "i", "em", "strong", "a"],
      allowedAttributes: {
        a: ["href", "target"],
      },
    });
  }

  return (
    <section className="py-12 bg-background">
      <div className="container">
        <SectionHeader title={title} viewAllLink={viewAllLink} color={color} />

        <Tabs defaultValue="all" className="mb-8" onValueChange={handleTabChange}>
          <TabsList className="mb-6 bg-card rounded-lg border shadow-sm">
            <TabsTrigger
              value="all"
              className={cn(
                "rounded-md px-4 py-2 text-sm font-semibold transition-all",
                "text-foreground/90 hover:bg-muted/50",
                "data-[state=active]:bg-primary data-[state=active]:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              Semua
            </TabsTrigger>

            {isCategoriesLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => <div key={i} className="h-9 w-24 bg-muted/60 animate-pulse rounded-md mx-1" />)
            ) : limitedCategories.length > 0 ? (
              limitedCategories.map((category: Category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.slug}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-semibold transition-all",
                    "text-foreground/90 hover:bg-muted/50",
                    "data-[state=active]:bg-primary data-[state=active]:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary "
                  )}
                >
                  {category.name}
                </TabsTrigger>
              ))
            ) : (
              <>
                {["Politik", "Bisnis", "Teknologi", "Hiburan"].map((name) => (
                  <TabsTrigger
                    key={name}
                    value={name.toLowerCase()}
                    className={cn(
                      "rounded-md px-4 py-2 text-sm font-semibold transition-all",
                      "text-foreground/90 hover:bg-muted/50",
                      "data-[state=active]:bg-primary data-[state=active]:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    {name}
                  </TabsTrigger>
                ))}
              </>
            )}
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? // Show loading placeholders
                Array(8)
                  .fill(0)
                  .map((_, i) => <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>)
              : articles && articles.items.length > 0
              ? // Show actual articles
                limitedArticles.map((article, i) => (
                  <NewsCard
                    key={article.id}
                    id={parseInt(article.id.substring(0, 8), 16) || i}
                    title={article.title}
                    excerpt={article.content?.substring(0, 120) || ""}
                    category={article.category?.name || "Uncategorized"}
                    image={article.imageUrl || generatePlaceholderDataURL(`Image ${i}`, 500, 300)}
                    publishedAt={formatRelativeTime(article.publishedAt || "")}
                    categoryColor={"primary"}
                    slug={article.slug} // Add
                  />
                ))
              : // Fallback to mock data if no articles
                [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <NewsCard
                    key={i}
                    id={i}
                    title={
                      i % 4 === 0
                        ? "Government Announces New Economic Policy Framework"
                        : i % 4 === 1
                        ? "Major Company Reports Record Quarterly Profits"
                        : i % 4 === 2
                        ? "New Smartphone Features Revolutionary Technology"
                        : "Blockbuster Movie Breaks Opening Weekend Records"
                    }
                    excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    category={
                      i % 4 === 0 ? "Politics" : i % 4 === 1 ? "Business" : i % 4 === 2 ? "Technology" : "Entertainment"
                    }
                    image={`/placeholder.svg?height=300&width=500&text=${i}`}
                    publishedAt={`${i} hour${i !== 1 ? "s" : ""} ago`}
                    categoryColor={
                      i % 4 === 0 ? "primary" : i % 4 === 1 ? "secondary" : i % 4 === 2 ? "accent" : "success"
                    }
                    slug={
                      i % 4 === 0
                        ? "government-announces-new-economic-policy-framework"
                        : i % 4 === 1
                        ? "major-company-reports-record-quarterly-profits"
                        : i % 4 === 2
                        ? "new-smartphone-features-revolutionary-technology"
                        : "blockbuster-movie-breaks-opening-weekend-records"
                    }
                  />
                ))}
          </TabsContent>

          {/* Dynamic TabsContent based on categories */}
          {isCategoriesLoading
            ? null
            : limitedCategories.length > 0
            ? // Generate tabs for each category
              limitedCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.slug}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {isLoading ? (
                    // Show loading placeholders
                    Array(8)
                      .fill(0)
                      .map((_, i) => <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>)
                  ) : articles && articles.items.length > 0 ? (
                    // Show actual articles
                    articles.items.map((article, i) => (
                      <NewsCard
                        key={article.id}
                        id={parseInt(article.id.substring(0, 8), 16) || i}
                        title={article.title}
                        excerpt={article.content?.substring(0, 120) || ""}
                        category={article.category?.name || "Uncategorized"}
                        image={article.imageUrl || `/placeholder.svg?height=300&width=500&text=${i}`}
                        publishedAt={formatRelativeTime(article.publishedAt || "")}
                        categoryColor={"primary"}
                        slug={article.slug} // Add
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center p-12">
                      <p className="text-muted-foreground">Tidak ada berita untuk {category.name}</p>
                    </div>
                  )}
                </TabsContent>
              ))
            : // Fallback to static tabs if no categories
              ["politik", "bisnis", "teknologi", "hiburan"].map((tab) => (
                <TabsContent key={tab} value={tab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {isLoading ? (
                    // Show loading placeholders
                    Array(8)
                      .fill(0)
                      .map((_, i) => <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>)
                  ) : articles && articles.items.length > 0 ? (
                    // Show actual articles
                    limitedArticles.map((article, i) => (
                      <NewsCard
                        key={article.id}
                        id={parseInt(article.id.substring(0, 8), 16) || i}
                        title={article.title}
                        excerpt={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sanitizeContent(article.content?.substring(0, 120) || ""),
                            }}
                          />
                        }
                        category={article.category?.name || "Uncategorized"}
                        image={generatePlaceholderDataURL(`Image ${i}`, 500, 300)}
                        publishedAt={formatRelativeTime(article.publishedAt || "")}
                        categoryColor={"primary"}
                        slug={article.slug} // Add
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center p-12">
                      <p className="text-muted-foreground">Tidak ada berita untuk {tab}</p>
                    </div>
                  )}
                </TabsContent>
              ))}
        </Tabs>
      </div>
    </section>
  );
}
