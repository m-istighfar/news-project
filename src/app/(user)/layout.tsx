"use client";

import { Header } from "@/components/client";
import { Footer } from "@/components/client/Footer";
import { Suspense } from "react";

function HeaderWithSearch() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
          <div className="bg-primary text-primary-foreground py-1.5">
            <div className="container h-5" />
          </div>
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-32 bg-muted animate-pulse rounded" />
              <div className="hidden md:flex items-center gap-6">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-4 w-16 bg-muted animate-pulse rounded" />
                  ))}
              </div>
              <div />
            </div>
            <div className="mt-4 h-10 bg-muted animate-pulse rounded" />
          </div>
        </header>
      }
    >
      <Header />
    </Suspense>
  );
}

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeaderWithSearch />
      {children}
      <Footer />
    </div>
  );
}
