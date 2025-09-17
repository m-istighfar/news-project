import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Article } from "@/types/article";

interface BreadcrumbProps {
  article: Article;
}

export function Breadcrumb({ article }: BreadcrumbProps) {
  return (
    <div className="bg-muted py-3">
      <div className="container">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href={`/kategori/${article.category.slug}`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {article.category.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground font-medium truncate">{article.title}</span>
        </div>
      </div>
    </div>
  );
}
