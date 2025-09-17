"use client";

import { useUsers } from "@/services/user/useUsers";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { columns } from "./columns";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SearchInput } from "@/components/ui/search-input";

export default function UsersContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || undefined;

  const { data, isLoading } = useUsers(page, search);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Pengguna</h1>
          <p className="text-sm text-muted-foreground">Kelola pengguna website Anda.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line-200 bg-background p-4 shadow-sm">
          <div /> {/* Empty div to maintain flex justify-between */}
          <div className="flex items-center gap-4">
            <div className="w-full sm:w-[300px]">
              <SearchInput
                placeholder="Cari pengguna..."
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
                className="h-9 border-line-200 transition-colors hover:border-primary-300 focus:border-primary-400 focus:ring-primary-400/20"
              />
            </div>
            <Link href="/dashboard/users/tambah">
              <PrimaryButton size="sm" icon={<Plus className="h-4 w-4" />}>
                Tambah Pengguna
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
