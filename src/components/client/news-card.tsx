import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import sanitizeHtml from "sanitize-html";

interface NewsCardProps {
  id: number;
  title: string;
  excerpt: React.ReactNode;
  category: string;
  image: string;
  publishedAt: string;
  categoryColor: "primary" | "secondary" | "accent" | "success" | "destructive";
  slug: string; // Added slug property
}

function sanitizeContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: ["p", "b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href", "target"],
    },
  });
}

export function NewsCard({
  title,
  excerpt,
  category,
  image,
  publishedAt,
  categoryColor = "primary",
  slug,
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden group card-hover border flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <Badge className={cn(`bg-${categoryColor}`, `hover:bg-${categoryColor}/90`, "text-white")}>{category}</Badge>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <CardHeader className="flex-initial p-4">
          <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4 pt-0">
          {typeof excerpt === "string" ? (
            <div
              className="text-sm text-muted-foreground line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(excerpt),
              }}
            />
          ) : (
            <div className="text-sm text-muted-foreground line-clamp-2">{excerpt}</div>
          )}
        </CardContent>
        <CardFooter className="flex-initial p-4 pt-0 flex justify-between items-center mt-auto">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" /> {publishedAt}
          </span>
          <Link
            href={`/news/${slug}`}
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-md",
              "flex items-center gap-1.5",
              `text-${categoryColor} hover:bg-${categoryColor}/10`,
              "transition-all duration-200",
              "group/link"
            )}
          >
            Selengkapnya
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
