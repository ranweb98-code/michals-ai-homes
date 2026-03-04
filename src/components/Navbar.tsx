import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !isOpen;

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
      isTransparent
        ? "bg-transparent border-transparent"
        : "glass border-b border-border/50 shadow-sm"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className={`text-2xl font-bold font-playfair transition-colors duration-300 ${
              isTransparent ? "text-primary-foreground" : "text-foreground"
            }`}>
              מיכל
            </span>
            <span className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
              isTransparent ? "text-primary-foreground/60" : "text-muted-foreground"
            }`}>נדל״ן</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-all duration-300 relative py-1 ${
                  location.pathname === link.to
                    ? "text-gold"
                    : isTransparent
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 right-0 left-0 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Phone + Instagram */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/aragehomes"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 hover:text-gold ${
                isTransparent ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="tel:+972534213841"
              className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              <span dir="ltr">053-421-3841</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isTransparent ? "text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="glass border-t border-border/50">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-gold bg-gold/5"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 mt-2 border-t border-border">
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
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
