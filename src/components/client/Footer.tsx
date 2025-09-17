import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Logo } from "../ui/logo";

const footerData = {
  social: [
    { name: "Facebook", icon: Facebook, color: "primary" },
    { name: "Twitter", icon: Twitter, color: "secondary" },
    { name: "Instagram", icon: Instagram, color: "accent" },
    { name: "LinkedIn", icon: Linkedin, color: "success" },
  ],
  categories: [
    { name: "Politik", href: "/kategori/politik", color: "primary" },
    { name: "Bisnis", href: "/kategori/bisnis", color: "secondary" },
    { name: "Teknologi", href: "/kategori/teknologi", color: "accent" },
    { name: "Hiburan", href: "/kategori/hiburan", color: "success" },
    { name: "Olahraga", href: "/kategori/olahraga", color: "destructive" },
    { name: "Kesehatan", href: "/kategori/kesehatan", color: "primary" },
  ],
  company: [
    { name: "Tentang Kami", href: "/about", color: "primary" },
    { name: "Kontak", href: "/contact", color: "secondary" },
    { name: "Karir", href: "/careers", color: "accent" },
    { name: "Iklan", href: "/advertise", color: "success" },
    { name: "Kode Etik", href: "/ethics", color: "destructive" },
    { name: "Kebijakan Privasi", href: "/privacy", color: "primary" },
  ],
  contact: {
    address: "Jl. News Raya No. 123",
    city: "Jakarta Selatan",
    postal: "Indonesia 12345",
    email: "redaksi@koransidak.com",
    phone: "+62 21 1234 5678",
  },
  legal: [
    { name: "Syarat & Ketentuan", href: "/terms", color: "primary" },
    { name: "Kebijakan Privasi", href: "/privacy", color: "secondary" },
    { name: "Kebijakan Cookie", href: "/cookies", color: "accent" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Portal berita terpercaya dengan liputan mendalam tentang politik, bisnis, teknologi, hiburan, dan topik
              terkini lainnya.
            </p>
            <div className="flex gap-4">
              {footerData.social.map((item) => (
                <Button
                  key={item.name}
                  variant="outline"
                  size="icon"
                  className={`rounded-full h-10 w-10 hover:bg-${item.color} hover:text-${item.color}-foreground transition-all duration-200`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Kategori</h3>
            <ul className="space-y-3">
              {footerData.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm text-muted-foreground hover:text-${item.color} transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Perusahaan</h3>
            <ul className="space-y-3">
              {footerData.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm text-muted-foreground hover:text-${item.color} transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Hubungi Kami</h3>
            <address className="not-italic space-y-3">
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{footerData.contact.address}</p>
                <p>{footerData.contact.city}</p>
                <p>{footerData.contact.postal}</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Email: {footerData.contact.email}</p>
                <p>Tel: {footerData.contact.phone}</p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portal Berita. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6">
            {footerData.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm text-muted-foreground hover:text-${item.color} transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
