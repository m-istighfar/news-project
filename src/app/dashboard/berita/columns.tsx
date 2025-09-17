"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/types/article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { useDeleteArticle, useToggleHotArticle } from "@/services/article/useArticles";
import { showConfirmDialog } from "@/lib/utils/swal";
import { Flame } from "lucide-react";

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => {
      const article = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{article.title}</span>
          <span className="text-sm text-muted-foreground">oleh {article.author.name || article.author.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Kategori",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "published" ? "default" : "secondary"} className="text-white">
          {status === "published" ? "Terbit" : "Draft"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "isHot",
    header: "Berita Utama",
    cell: ({ row }) => {
      const article = row.original;
      const isHot = row.getValue("isHot") as boolean;
      const toggleHot = useToggleHotArticle();

      const handleToggleHot = async () => {
        const confirmed = await showConfirmDialog(
          isHot ? "Hapus dari Berita Utama" : "Jadikan Berita Utama",
          `Apakah Anda yakin ingin ${
            isHot ? "menghapus berita ini dari" : "menjadikan berita ini sebagai"
          } berita utama?`,
          isHot ? "Hapus" : "Jadikan"
        );

        if (confirmed) {
          await toggleHot.mutateAsync(article.id);
        }
      };

      return (
        <Badge
          variant={isHot ? "destructive" : "outline"}
          className={cn("cursor-pointer", isHot ? "text-white" : "text-muted-foreground")}
          onClick={handleToggleHot}
        >
          <Flame className={cn("mr-1 h-3 w-3", !isHot && "text-muted-foreground")} />
          {isHot ? "Berita Utama" : "Reguler"}
        </Badge>
      );
    },
  },
  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;
      const deleteArticle = useDeleteArticle();

      const handleDelete = async () => {
        const confirmed = await showConfirmDialog(
          "Hapus Berita",
          "Apakah Anda yakin ingin menghapus berita ini?",
          "Hapus"
        );

        if (confirmed) {
          await deleteArticle.mutateAsync(article.id);
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
            <Link href={`/dashboard/berita/${article.id}/edit`}>
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
