"use client";

import { Badge } from "@/components/ui/badge";
import { useHotArticles } from "@/services/article/useHotArticles";

export function BreakingNewsTickerClient() {
  const { data: hotNews } = useHotArticles();

  return (
    <div className="bg-destructive text-destructive-foreground py-2.5">
      <div className="container flex items-center gap-4 overflow-hidden">
        <Badge variant="outline" className="bg-background text-foreground shrink-0 font-bold px-3 py-1.5 z-10">
          BREAKING
        </Badge>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {!hotNews ? (
              <span className="mx-4">Loading news...</span>
            ) : (
              <>
                <div className="flex">
                  {hotNews.map((item, index) => (
                    <span key={item.id}>
                      <span className="mx-4">{item.title}</span>
                      {index < hotNews.length - 1 && <span className="mx-4">•</span>}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  {hotNews.map((item, index) => (
                    <span key={`${item.id}-duplicate`}>
                      <span className="mx-4">{item.title}</span>
                      {index < hotNews.length - 1 && <span className="mx-4">•</span>}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
