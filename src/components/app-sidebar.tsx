"use client";

import * as React from "react";
import { BookOpen, Frame, SquareStack, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useStore } from "@/store/store";

const data = {
  navMain: [
    {
      title: "Berita",
      url: "/dashboard/berita",
      icon: BookOpen,
      items: [
        {
          title: "Semua Berita",
          url: "/dashboard/berita",
        },
        {
          title: "Tambah Berita",
          url: "/dashboard/berita/tambah",
        },
      ],
    },
    {
      title: "Kategori",
      url: "/dashboard/kategori",
      icon: Frame,
      items: [
        {
          title: "Semua Kategori",
          url: "/dashboard/kategori",
        },
        {
          title: "Tambah Kategori",
          url: "/dashboard/kategori/tambah",
        },
      ],
    },
    {
      title: "Pengguna",
      url: "/dashboard/users",
      icon: Users,
      items: [
        {
          title: "Semua Pengguna",
          url: "/dashboard/users",
        },
        {
          title: "Tambah Pengguna",
          url: "/dashboard/users/tambah",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useStore((state) => state.user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
          <SquareStack className="h-5 w-5 text-primary shrink-0" />
          <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">Berita</span>
          <span className="sr-only">Koran Sidak</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "",
            email: user?.email || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
