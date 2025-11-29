import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/buy", label: "Buy Our Product" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-20 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
            <div className="flex items-center justify-center w-16 h-16  rounded-md py-2">
              <img src="logo.png" alt="logo" className="w-20 h-30 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span
                  className={`relative text-base font-medium transition-colors duration-200 ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {location === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span
                  className={`block py-2 text-base font-medium transition-colors duration-200 ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
