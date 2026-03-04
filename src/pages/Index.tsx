import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Building, Users, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import heroBg from "@/assets/hero-bg.jpg";
import CountUp from "@/components/CountUp";
import FadeIn from "@/components/FadeIn";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: properties = [], isLoading } = useProperties();
  const featured = properties.filter((p) => p.isNew || p.isHot).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="נדלן יוקרתי" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold-foreground px-5 py-2 rounded-full mb-8 text-sm">
              <Sparkles className="h-4 w-4 text-gold" />
              <span>שירות נדל״ן פרימיום באשדוד</span>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair text-primary-foreground mb-6 leading-[1.1] tracking-tight">
              מצאו את הבית
              <br />
              <span className="text-gold">המושלם שלכם</span>
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-xl mx-auto font-light leading-relaxed">
              מיכל – סוכנת נדל״ן עם שירות אישי, מקצועיות
              <br className="hidden md:block" />
              וליווי מלא עד סגירת העסקה
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/properties">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2 text-base px-10 h-14 rounded-full shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5">
                  צפו בנכסים שלנו
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ai-finder">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 text-base px-10 h-14 rounded-full backdrop-blur-sm">
                  <Sparkles className="h-5 w-5" />
                  מציאת נכס חכמה
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <ChevronDown className="h-6 w-6 text-primary-foreground/50" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <FadeIn>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
                  <Building className="h-7 w-7 text-gold" />
                </div>
                <CountUp end={150} suffix="+" />
                <span className="text-muted-foreground text-sm tracking-wide">נכסים שנמכרו בהצלחה</span>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-gold" />
                </div>
                <CountUp end={200} suffix="+" />
                <span className="text-muted-foreground text-sm tracking-wide">לקוחות מרוצים</span>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
                  <Award className="h-7 w-7 text-gold" />
                </div>
                <CountUp end={10} suffix="+" />
                <span className="text-muted-foreground text-sm tracking-wide">שנות ניסיון בשוק</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-3 block">נכסים נבחרים</span>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-4">נכסים מומלצים</h2>
              <p className="text-muted-foreground max-w-md mx-auto">מבחר הנכסים הפופולריים ביותר שלנו, שנבחרו במיוחד עבורכם</p>
            </div>
          </FadeIn>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[420px] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((p, i) => (
                <FadeIn key={p.id} delay={i * 150}>
                  <PropertyCard property={p} />
                </FadeIn>
              ))}
            </div>
          )}
          <FadeIn delay={200}>
            <div className="text-center mt-14">
              <Link to="/properties">
                <Button variant="outline" size="lg" className="gap-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background rounded-full px-10 h-13 transition-all">
                  לכל הנכסים
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-8 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>טכנולוגיה חכמה</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-background leading-tight">
              תנו ל-AI למצוא לכם
              <br />
              <span className="text-gold">את הנכס המושלם</span>
            </h2>
            <p className="text-background/50 mb-10 max-w-lg mx-auto text-lg font-light">
              המערכת החכמה שלנו תמצא לכם את הנכס המושלם בהתאם להעדפות שלכם
            </p>
            <Link to="/ai-finder">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2 text-base px-10 h-14 rounded-full shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5">
                <Sparkles className="h-5 w-5" />
                התחילו עכשיו
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Floating AI Button */}
      <Link
        to="/ai-finder"
        className="fixed bottom-6 left-6 z-50 bg-gold hover:bg-gold-dark text-gold-foreground rounded-full p-4 shadow-xl shadow-gold/30 animate-pulse-gold transition-all hover:scale-110 hover:-translate-y-1"
        title="מציאת נכס בעזרת AI"
      >
        <Sparkles className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Index;
