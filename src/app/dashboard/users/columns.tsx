"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteUser } from "@/services/user/useUsers";
import { showConfirmDialog } from "@/lib/utils/swal";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const deleteUser = useDeleteUser();

      const handleDelete = async () => {
        const confirmed = await showConfirmDialog(
          "Hapus Pengguna",
          "Apakah Anda yakin ingin menghapus pengguna ini?",
          "Hapus"
        );

        if (confirmed) {
          await deleteUser.mutateAsync(user.id);
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
            <Link href={`/dashboard/users/${user.id}/edit`}>
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
