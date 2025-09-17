"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({ columns, data, pageCount = 1, isLoading }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Function to create URL with updated page parameter
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate page numbers for pagination
  const generatePagination = (currentPage: number, totalPages: number) => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If current page is among the first 3 pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    // If current page is among the last 3 pages
    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // If current page is somewhere in the middle
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  };

  const pages = generatePagination(currentPage, pageCount);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-line-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-line-200 bg-muted/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-11 px-4 text-sm font-medium text-muted-foreground">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-400 border-t-transparent"></div>
                    <span className="text-sm text-muted-foreground">Memuat data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-line-200 transition-colors hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="rounded-full bg-muted/30 p-3">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Tidak ada data.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 0 && (
        <Pagination className="mt-4">
          <PaginationContent className="space-x-1">
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                aria-disabled={currentPage <= 1}
                className={`rounded-md transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>

            {pages.map((page, i) => (
              <PaginationItem key={i}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis className="text-muted-foreground" />
                ) : (
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={currentPage === page}
                    className={`rounded-md transition-colors ${
                      currentPage === page ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : "hover:bg-muted/30"
                    }`}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={currentPage < pageCount ? createPageURL(currentPage + 1) : "#"}
                aria-disabled={currentPage >= pageCount}
                className={`rounded-md transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                  currentPage >= pageCount ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
