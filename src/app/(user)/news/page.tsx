"use client";

import { BreakingNewsTicker, HotNewsSection } from "@/components/client";

import { NewsSection } from "@/components/client/NewsSection";
import { CategoriesSection } from "@/components/client/CategoriesSection";
import { useCategories } from "@/services/category/useCategories";

export default function Home() {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories(1, undefined, 12);

  const categories = categoriesData?.items;

  return (
    <main className="flex-1">
      <BreakingNewsTicker />
      <HotNewsSection />
      <CategoriesSection categories={categories} isLoading={isCategoriesLoading} />
      <NewsSection categories={categories} isCategoriesLoading={isCategoriesLoading} />
    </main>
  );
}
