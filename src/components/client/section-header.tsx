import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "destructive";
}

export function SectionHeader({ title, viewAllLink, color = "primary" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold tracking-tight flex items-center">
        <span className={`w-2 h-6 bg-${color} rounded-full mr-2 inline-block`}></span>
        {title}
      </h2>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className={`text-sm font-medium text-${color} flex items-center gap-1 hover:underline`}
        >
          Lihat Semua <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
