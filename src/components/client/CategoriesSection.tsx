import { SectionHeader, CategoryCard } from "@/components/client";
import { Category } from "@/types/category";

const fallbackCategories = [
  { name: "Politik" },
  { name: "Bisnis" },
  { name: "Teknologi" },
  { name: "Hiburan" },
  { name: "Olahraga" },
  { name: "Kesehatan" },
  { name: "Sains" },
  { name: "Travel" },
  { name: "Kuliner" },
  { name: "Budaya" },
  { name: "Gaya Hidup" },
  { name: "Opini" },
];

interface CategoriesSectionProps {
  categories?: Category[];
  isLoading?: boolean;
}

export function CategoriesSection({ categories = [], isLoading = false }: CategoriesSectionProps) {
  const limitedCategories = categories?.slice(0, 12) || [];

  return (
    <section className="py-12 bg-accent/10">
      <div className="container">
        <SectionHeader title="Kategori" viewAllLink="/kategori" color="primary" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array(12)
                .fill(0)
                .map((_, i) => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>)
            : limitedCategories.length > 0
            ? limitedCategories.map((category: Category) => <CategoryCard key={category.id} name={category.name} />)
            : fallbackCategories.map((category, i) => <CategoryCard key={i} name={category.name} />)}
        </div>
      </div>
    </section>
  );
}
