import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import ArticlesContent from "./content";

export default function NewsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ArticlesContent />
    </Suspense>
  );
}
