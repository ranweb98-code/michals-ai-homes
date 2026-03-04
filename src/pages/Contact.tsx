import { Phone, MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="pt-20 md:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">צור קשר</h1>
            <p className="text-muted-foreground">נשמח לעמוד לשירותכם</p>
          </div>

          <div className="space-y-4 mb-12">
            <a
              href="tel:+972534213841"
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-gold transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">טלפון</h3>
                <span className="text-muted-foreground" dir="ltr">053-421-3841</span>
              </div>
            </a>

            <a
              href="https://wa.me/972534213841"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-green-500 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">וואטסאפ</h3>
                <span className="text-muted-foreground">שלחו הודעה ישירות</span>
              </div>
            </a>

            <a
              href="https://www.instagram.com/aragehomes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-pink-500 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                <Instagram className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">אינסטגרם</h3>
                <span className="text-muted-foreground">@aragehomes</span>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">אזור פעילות</h3>
                <span className="text-muted-foreground">אשדוד, אשקלון, יבנה, גן יבנה והסביבה</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">שעות פעילות</h3>
                <span className="text-muted-foreground">ימים א׳-ה׳ 9:00-19:00 | שישי 9:00-13:00</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="https://wa.me/972534213841" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 px-8 text-base">
                <MessageCircle className="h-5 w-5" />
                שלחו הודעה עכשיו
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
