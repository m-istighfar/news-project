import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-3 mt-6">
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
      </SheetContent>
    </Sheet>
  );
}
