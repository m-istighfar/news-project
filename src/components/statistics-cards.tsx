"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

interface StatisticsCardsProps {
  isLoading: boolean;
  totalItems: number;
  publishedCount: number;
  draftCount: number;
}

export function StatisticsCards({ isLoading, totalItems, publishedCount, draftCount }: StatisticsCardsProps) {
  const cards = [
    {
      title: "Total Berita",
      value: totalItems,
      description: "Jumlah semua berita",
    },
    {
      title: "Berita Terbit",
      value: publishedCount,
      description: "Berita yang sudah dipublikasikan",
    },
    {
      title: "Berita Draft",
      value: draftCount,
      description: "Berita yang belum dipublikasikan",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="group flex flex-col justify-center items-start p-4 sm:p-[30px_15px] gap-[15px] bg-[#2F5673] shadow-[0px_1px_3px_rgba(0,0,0,0.15)] rounded-[10px] relative overflow-hidden flex-1 min-h-[120px] sm:min-h-[143px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-[#375f7d] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_50%,transparent_50.1%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_50%,transparent_50.1%)] before:opacity-50 before:transition-opacity before:duration-300 group-hover:before:opacity-70"
        >
          <div className="flex flex-col justify-center items-start gap-2 sm:gap-[15px] isolate w-full z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 w-full">
              <CardTitle className="text-sm font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
                {card.title}
              </CardTitle>
              <FileText className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <Skeleton className="h-7 w-20 bg-white/20" />
              ) : (
                <div className="text-2xl font-bold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/90">
                  {card.value || 0}
                </div>
              )}
              <p className="text-xs text-white/80 transition-all duration-300 group-hover:translate-x-1">
                {card.description}
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
