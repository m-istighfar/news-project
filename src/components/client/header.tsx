import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    router.push(`/semua-berita?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="bg-primary text-primary-foreground py-1.5">
        <div className="container flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-4">
            <span className="text-white">{formattedDate}</span>
            <span className="text-white">Jakarta, Indonesia</span>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="flex items-center justify-between">
          <MobileNav />
          <Logo />

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Beranda
            </Link>
            <Link href="/kategori/politik" className="text-sm font-medium hover:text-primary transition-colors">
              Politik
            </Link>
            <Link href="/kategori/bisnis" className="text-sm font-medium hover:text-primary transition-colors">
              Bisnis
            </Link>
            <Link href="/kategori/teknologi" className="text-sm font-medium hover:text-primary transition-colors">
              Teknologi
            </Link>
            <Link href="/kategori/hiburan" className="text-sm font-medium hover:text-primary transition-colors">
              Hiburan
            </Link>
            <Link href="/kategori/olahraga" className="text-sm font-medium hover:text-primary transition-colors">
              Olahraga
            </Link>
            <Link href="/kategori/kesehatan" className="text-sm font-medium hover:text-primary transition-colors">
              Kesehatan
            </Link>
          </div>

          <div></div>
        </div>

        <form onSubmit={handleSearch} className="mt-4 flex">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button type="submit" className="rounded-l-none text-white font-bold">
            Cari
          </Button>
        </form>
      </div>
    </header>
  );
}
