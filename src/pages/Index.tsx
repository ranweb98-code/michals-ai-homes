import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Building, Users, Award } from "lucide-react";
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
        <img src={heroBg} alt="נדלן יוקרתי" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white mb-6 leading-tight">
              מצאו את הבית המושלם שלכם
              <br />
              <span className="text-gold">באשדוד והסביבה</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              מיכל – סוכנת נדל״ן עם שירות אישי, מקצועיות וליווי מלא עד סגירת העסקה
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground gap-2 text-base px-10">
                צפו בנכסים שלנו
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeIn>
              <div className="flex flex-col items-center gap-3">
                <Building className="h-10 w-10 text-gold" />
                <CountUp end={150} suffix="+" />
                <span className="text-muted-foreground">נכסים שנמכרו</span>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="flex flex-col items-center gap-3">
                <Users className="h-10 w-10 text-gold" />
                <CountUp end={200} suffix="+" />
                <span className="text-muted-foreground">לקוחות מרוצים</span>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col items-center gap-3">
                <Award className="h-10 w-10 text-gold" />
                <CountUp end={10} suffix="+" />
                <span className="text-muted-foreground">שנות ניסיון</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">נכסים מומלצים</h2>
              <p className="text-muted-foreground">מבחר הנכסים הפופולריים ביותר שלנו</p>
            </div>
          </FadeIn>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p, i) => (
                <FadeIn key={p.id} delay={i * 150}>
                  <PropertyCard property={p} />
                </FadeIn>
              ))}
            </div>
          )}
          <FadeIn delay={200}>
            <div className="text-center mt-10">
              <Link to="/properties">
                <Button variant="outline" className="gap-2 border-gold text-gold hover:bg-gold hover:text-gold-foreground">
                  לכל הנכסים
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">מחפשים נכס? תנו ל-AI למצוא לכם</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              המערכת החכמה שלנו תמצא לכם את הנכס המושלם בהתאם להעדפות שלכם
            </p>
            <Link to="/ai-finder">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground gap-2 text-base px-8">
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
        className="fixed bottom-6 left-6 z-50 bg-gold hover:bg-gold/90 text-gold-foreground rounded-full p-4 shadow-lg animate-pulse-gold transition-transform hover:scale-110"
        title="מציאת נכס בעזרת AI"
      >
        <Sparkles className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Index;
