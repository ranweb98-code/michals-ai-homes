import { Link } from "react-router-dom";
import { Phone, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold font-playfair mb-4">מיכל נדל״ן</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              סוכנת נדל״ן המתמחה באזור אשדוד והסביבה, עם שירות אישי וליווי מלא עד סגירת העסקה.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">ניווט מהיר</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">דף הבית</Link>
              <Link to="/properties" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">נכסים</Link>
              <Link to="/ai-finder" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">מציאת נכס AI</Link>
              <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">אודות</Link>
              <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">צור קשר</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">צור קשר</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+972534213841" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Phone className="h-4 w-4" />
                <span dir="ltr">053-421-3841</span>
              </a>
              <a href="https://wa.me/972534213841" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <MessageCircle className="h-4 w-4" />
                וואטסאפ
              </a>
              <a href="https://www.instagram.com/aragehomes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" />
                @aragehomes
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center">
          <p className="text-xs text-primary-foreground/50">© {new Date().getFullYear()} מיכל נדל״ן. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
