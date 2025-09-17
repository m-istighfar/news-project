"use client";

import { useCategories } from "@/services/category/useCategories";
import { CategoryCard } from "@/components/client/category-card";
import { Loader } from "@/components/ui/loader";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories(1, undefined, 100);

  return (
    <main className="flex-1">
      <div className="container">
        <div className="py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Kategori Berita</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jelajahi berita berdasarkan kategori yang Anda minati untuk mendapatkan informasi yang lebih relevan
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories?.items.map((category) => (
                <CategoryCard key={category.id} name={category.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
