import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  icon?: string;
  color?: string;
}

export function CategoryCard({ name, icon }: CategoryCardProps) {
  return (
    <Link
      href={`/kategori/${name.toLowerCase()}`}
      className={cn(
        "group relative flex flex-col items-center justify-center p-4 rounded-lg overflow-hidden",
        "bg-gradient-to-br from-primary-200 to-primary-300/50",
        "border border-primary-300/30",
        "transition-all duration-200 ease-out",
        "hover:shadow-lg hover:shadow-primary-300/20",
        "hover:border-primary-400 hover:scale-[1.02]",
        "active:scale-95",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-br before:from-primary-100/20 before:to-primary-200/10",
        "before:opacity-0 before:transition-opacity before:duration-200",
        "hover:before:opacity-100"
      )}
    >
      {icon && (
        <span className="relative text-2xl mb-2 text-primary-700 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200">
          {icon}
        </span>
      )}
      <span className="relative text-sm font-bold text-primary-800 group-hover:text-primary-900">{name}</span>
    </Link>
  );
}
