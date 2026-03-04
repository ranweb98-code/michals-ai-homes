import { Award, Users, Building, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="pt-20 md:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">אודות מיכל</h1>
            <p className="text-muted-foreground">סוכנת נדל״ן מובילה באשדוד והסביבה</p>
          </div>

          {/* Photo placeholder */}
          <div className="flex justify-center mb-10">
            <div className="w-48 h-48 rounded-full bg-gold-light border-4 border-gold flex items-center justify-center">
              <span className="text-6xl font-playfair font-bold text-gold">מ</span>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-center mb-12">
            <p>
              שמי מיכל ואני סוכנת נדל״ן המתמחה באזור אשדוד והסביבה כבר למעלה מעשור.
              אני מאמינה שמציאת הבית המושלם היא אחת ההחלטות החשובות בחיים,
              ולכן אני מלווה כל לקוח בצורה אישית ומקצועית מהרגע הראשון ועד סגירת העסקה.
            </p>
            <p>
              הניסיון הרב שלי בשוק הנדל״ן המקומי, היכרות מעמיקה עם השכונות והפרויקטים באזור,
              ורשת קשרים ענפה מאפשרים לי להציע ללקוחותיי את ההזדמנויות הטובות ביותר בשוק.
            </p>
            <p>
              אני גאה בשירות האישי שאני נותנת – זמינות מלאה, שקיפות, ויושרה מקצועית.
              המטרה שלי היא שכל לקוח ירגיש שהוא בידיים הכי טובות.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Heart, title: "שירות אישי", desc: "ליווי צמוד ואישי לכל לקוח" },
              { icon: Award, title: "מקצועיות", desc: "ידע מעמיק בשוק הנדל״ן המקומי" },
              { icon: Building, title: "היכרות מקומית", desc: "מכירה כל שכונה ופרויקט באזור" },
              { icon: Users, title: "לקוחות מרוצים", desc: "מאות עסקאות מוצלחות לאורך השנים" },
            ].map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-xl p-6 text-center">
                <v.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold/90 text-gold-foreground gap-2 px-8">
                צרו קשר עכשיו
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
