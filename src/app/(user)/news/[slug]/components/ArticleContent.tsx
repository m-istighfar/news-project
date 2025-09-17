import Image from "next/image";
import { Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Article } from "@/types/article";

interface ArticleContentProps {
  article: Article;
  excerpt: string;
  authorInitials: string;
}

export function ArticleContent({ article, excerpt, authorInitials }: ArticleContentProps) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{article.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?text=${authorInitials}`} alt={article.author.name} />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-xs text-muted-foreground">{article.author.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {formatDate(article.publishedAt || article.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> Read-only
            </span>
          </div>
        </div>
      </div>

      {article.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 prose prose-lg max-w-none mb-10">
          <p className="font-medium text-xl leading-relaxed mb-6">{excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="lg:col-span-4">{/* You can add related articles or other content here if needed */}</div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t">
        <span className="text-sm text-muted-foreground mr-2">Tags:</span>
        <Badge variant="outline" className="bg-muted/50">
          {article.category.name}
        </Badge>
        {article.isHot && (
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Hot News
          </Badge>
        )}
      </div>
    </div>
  );
}
