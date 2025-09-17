"use client";

import { Suspense } from "react";
import UsersContent from "./content";
import { Loader } from "@/components/ui/loader";

export default function UsersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <UsersContent />
    </Suspense>
  );
}
