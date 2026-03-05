import { Star } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const testimonials = [
  {
    name: "רונית כהן",
    text: "מיכל ליוותה אותנו לאורך כל הדרך ברכישת הדירה החדשה שלנו. מקצועית, זמינה ואכפתית – ממליצה בחום!",
    rating: 5,
  },
  {
    name: "אבי לוי",
    text: "הודות למיכל מכרנו את הדירה במחיר מעולה ובזמן קצר. היא יודעת לנהל משא ומתן ברמה הגבוהה ביותר.",
    rating: 5,
  },
  {
    name: "שירה ברק",
    text: "חיפשנו דירת השקעה ומיכל מצאה לנו בדיוק את מה שרצינו. שירות אישי ומקצועי מהרגע הראשון.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-3 block">המלצות</span>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-4">מה הלקוחות אומרים</h2>
            <p className="text-muted-foreground max-w-md mx-auto">לקוחות מרוצים שכבר מצאו את הבית שלהם איתנו</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 150}>
              <div className="bg-card border border-border rounded-2xl p-8 text-center h-full flex flex-col">
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-gold font-playfair">{t.name.charAt(0)}</span>
                </div>
                <span className="font-semibold text-foreground text-sm">{t.name}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
