import { Link } from "react-router-dom";
import { Phone, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold font-playfair mb-2">מיכל</h3>
            <span className="text-xs tracking-widest uppercase text-background/40 mb-4 block">נדל״ן פרימיום</span>
            <p className="text-background/50 text-sm leading-relaxed mt-4">
              סוכנת נדל״ן המתמחה באזור אשדוד והסביבה, עם שירות אישי וליווי מלא עד סגירת העסקה.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-widest uppercase text-background/60">ניווט מהיר</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-background/50 hover:text-gold transition-colors duration-300">דף הבית</Link>
              <Link to="/properties" className="text-sm text-background/50 hover:text-gold transition-colors duration-300">נכסים</Link>
              <Link to="/ai-finder" className="text-sm text-background/50 hover:text-gold transition-colors duration-300">מציאת נכס AI</Link>
              <Link to="/about" className="text-sm text-background/50 hover:text-gold transition-colors duration-300">אודות</Link>
              <Link to="/contact" className="text-sm text-background/50 hover:text-gold transition-colors duration-300">צור קשר</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-widest uppercase text-background/60">צור קשר</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+972534213841" className="flex items-center gap-3 text-sm text-background/50 hover:text-gold transition-colors duration-300">
                <div className="w-9 h-9 rounded-xl bg-background/10 flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span dir="ltr">053-421-3841</span>
              </a>
              <a href="https://wa.me/972534213841" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-background/50 hover:text-gold transition-colors duration-300">
                <div className="w-9 h-9 rounded-xl bg-background/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                וואטסאפ
              </a>
              <a href="https://www.instagram.com/aragehomes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-background/50 hover:text-gold transition-colors duration-300">
                <div className="w-9 h-9 rounded-xl bg-background/10 flex items-center justify-center">
                  <Instagram className="h-4 w-4" />
                </div>
                @aragehomes
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-xs text-background/30">© {new Date().getFullYear()} מיכל נדל״ן. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
