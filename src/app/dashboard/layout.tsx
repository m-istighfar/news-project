"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-line-200 bg-gradient-to-b from-dashboard-gradient-from to-dashboard-gradient-to backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="flex w-full items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1 hover:bg-primary-100/50" />
              <Separator orientation="vertical" className="h-4 bg-primary-200/50" />
              <BreadcrumbNav />
            </div>
            <div className="flex items-center gap-2">
              <time className="rounded-full bg-primary-300/80 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-primary-200/50">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 bg-gradient-to-b from-primary-50/30 to-white p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
