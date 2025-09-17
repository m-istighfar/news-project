"use client";

import { useArticles } from "@/services/article/useArticles";
import { DataTable } from "@/components/ui/data-table";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { columns } from "./columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/services/category/useCategories";
import { StatisticsCards } from "@/components/statistics-cards";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SearchInput } from "@/components/ui/search-input";

export default function ArticlesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const status = searchParams.get("status") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const search = searchParams.get("search") || undefined;

  const isHot = searchParams.get("isHot") || undefined;
  const { data, isLoading } = useArticles(page, status, categoryId, search, isHot);
  const { data: categoriesData } = useCategories(1, undefined, 100);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleStatusChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("status", value === "all" ? "" : value)}`);
  };

  const handleCategoryChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("categoryId", value === "all" ? "" : value)}`);
  };

  const handleHotNewsChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("isHot", value === "all" ? "" : value)}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Berita</h1>
          <p className="text-sm text-muted-foreground">Kelola semua berita yang ada di website Anda.</p>
        </div>
      </div>

      <StatisticsCards
        isLoading={isLoading}
        totalItems={data?.total_items || 0}
        publishedCount={data?.meta?.publishedCount || 0}
        draftCount={data?.meta?.draftCount || 0}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-lg border border-line-200 bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-md bg-primary-200/50 px-3 py-1.5">
              <FileText className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Filter:</span>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <Select value={status || "all"} onValueChange={handleStatusChange}>
                <SelectTrigger className="h-9 w-[130px] border-line-200 transition-colors hover:border-primary-300 focus:border-primary-400 focus:ring-primary-400/20">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="published">Terbit</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={categoryId || "all"} onValueChange={handleCategoryChange}>
                <SelectTrigger className="h-9 w-[130px] border-line-200 transition-colors hover:border-primary-300 focus:border-primary-400 focus:ring-primary-400/20">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categoriesData?.items?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Hot News Filter */}
              <Select value={searchParams.get("isHot") || "all"} onValueChange={handleHotNewsChange}>
                <SelectTrigger className="h-9 w-[130px] border-line-200 transition-colors hover:border-primary-300 focus:border-primary-400 focus:ring-primary-400/20">
                  <SelectValue placeholder="Berita Utama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Berita</SelectItem>
                  <SelectItem value="true">Berita Utama</SelectItem>
                  <SelectItem value="false">Berita Reguler</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Add Button */}
          <div className="flex items-center gap-3">
            <SearchInput
              placeholder="Cari berita..."
              value={search || ""}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams.toString());
                if (value) {
                  params.set("search", value);
                } else {
                  params.delete("search");
                }
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="h-9 w-[200px] border-line-200 transition-colors hover:border-primary-300 focus:border-primary-400 focus:ring-primary-400/20 sm:w-[250px]"
            />
            <Link href="/dashboard/berita/tambah">
              <PrimaryButton size="sm" icon={<Plus className="h-4 w-4" />}>
                Tambah Berita
              </PrimaryButton>
            </Link>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data?.items || []}
          pageCount={data?.total_pages || 1}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
