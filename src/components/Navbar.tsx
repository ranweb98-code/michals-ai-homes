import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "דף הבית" },
  { to: "/properties", label: "נכסים" },
  { to: "/ai-finder", label: "מציאת נכס AI" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-playfair text-foreground">
              מיכל
            </span>
            <span className="text-sm text-muted-foreground hidden sm:block">נדל״ן</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  location.pathname === link.to
                    ? "text-gold"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Phone + Instagram */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/aragehomes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="tel:+972534213841"
              className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span dir="ltr">053-421-3841</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  location.pathname === link.to
                    ? "text-gold"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-3 border-t border-border">
              <a
                href="tel:+972534213841"
                className="flex items-center gap-2 text-sm font-medium text-gold"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">053-421-3841</span>
              </a>
              <a
                href="https://www.instagram.com/aragehomes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
