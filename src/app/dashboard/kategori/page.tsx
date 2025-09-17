"use client";

import { Suspense } from "react";
import CategoryContent from "./content";
import { Loader } from "@/components/ui/loader";

export default function CategoriesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CategoryContent />
    </Suspense>
  );
}
