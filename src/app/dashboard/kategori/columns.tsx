"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteCategory } from "@/services/category/useCategories";
import { showConfirmDialog } from "@/lib/utils/swal";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },

  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const deleteCategory = useDeleteCategory();

      const handleDelete = async () => {
        const confirmed = await showConfirmDialog(
          "Hapus Kategori",
          "Apakah Anda yakin ingin menghapus kategori ini?",
          "Hapus"
        );

        if (confirmed) {
          await deleteCategory.mutateAsync(category.id);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/kategori/${category.id}/edit`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
