"use client";

import { useArticleBySlug } from "@/services/article/useArticles";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Header } from "@/components/client";
import { Footer } from "@/components/client/Footer";
import { Loader } from "@/components/ui/loader";

import { Breadcrumb } from "./components/Breadcrumb";
import { ArticleContent } from "./components/ArticleContent";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const { data: article, isLoading } = useArticleBySlug(slug as string);

  if (isLoading) {
    return (
      <main className="flex-1">
        <Loader />
      </main>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="flex h-[80vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg font-medium">Article not found</p>
              <Link href="/" className="text-primary hover:underline">
                Return to home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const excerpt = article.content.split("</p>")[0].replace(/<\/?[^>]+(>|$)/g, "");

  const authorInitials = article.author.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <main className="flex-1">
      <Breadcrumb article={article} />

      <div className="container py-12">
        <ArticleContent article={article} excerpt={excerpt} authorInitials={authorInitials} />
      </div>
    </main>
  );
}
