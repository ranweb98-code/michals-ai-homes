import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, formatPrice, generateWhatsAppLink } from "@/data/properties";
import { useProperties } from "@/hooks/useProperties";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import FadeIn from "@/components/FadeIn";

interface StepConfig {
  title: string;
  key: string;
  options: { label: string; value: string }[];
}

const steps: StepConfig[] = [
  {
    title: "מה התקציב שלכם?",
    key: "budget",
    options: [
      { label: "עד 1,000,000 ₪", value: "1000000" },
      { label: "1,000,000-1,500,000 ₪", value: "1500000" },
      { label: "1,500,000-2,000,000 ₪", value: "2000000" },
      { label: "2,000,000-3,000,000 ₪", value: "3000000" },
      { label: "3,000,000+ ₪", value: "3000001" },
    ],
  },
  {
    title: "איזה סוג נכס מעניין אתכם?",
    key: "type",
    options: [
      { label: "דירה", value: "דירה" },
      { label: "פנטהאוז", value: "פנטהאוז" },
      { label: "בית פרטי", value: "בית פרטי" },
      { label: "דו משפחתי", value: "דו משפחתי" },
      { label: "דירת גן", value: "דירת גן" },
    ],
  },
  {
    title: "כמה חדרים?",
    key: "rooms",
    options: [
      { label: "2 חדרים", value: "2" },
      { label: "3 חדרים", value: "3" },
      { label: "4 חדרים", value: "4" },
      { label: "5 חדרים", value: "5" },
      { label: "6+ חדרים", value: "6" },
    ],
  },
  {
    title: "באיזה מיקום?",
    key: "location",
    options: [
      { label: "אשדוד", value: "אשדוד" },
      { label: "אשקלון", value: "אשקלון" },
      { label: "יבנה", value: "יבנה" },
      { label: "גן יבנה", value: "גן יבנה" },
      { label: "הסביבה", value: "הסביבה" },
    ],
  },
  {
    title: "מה הכי חשוב לכם?",
    key: "priority",
    options: [
      { label: "מחיר נמוך", value: "cheap" },
      { label: "נכס גדול", value: "big" },
      { label: "נכס להשקעה", value: "investment" },
      { label: "נכס למשפחה", value: "family" },
      { label: "נכס יוקרתי", value: "luxury" },
    ],
  },
];

function scoreProperty(property: Property, selections: Record<string, string>): number {
  let score = 0;
  const budget = parseInt(selections.budget);
  if (budget === 3000001) {
    if (property.price >= 3000000) score += 25; else score += 10;
  } else {
    const budgetRanges: Record<string, [number, number]> = {
      "1000000": [0, 1000000], "1500000": [1000000, 1500000],
      "2000000": [1500000, 2000000], "3000000": [2000000, 3000000],
    };
    const [min, max] = budgetRanges[selections.budget] || [0, 999999999];
    if (property.price >= min && property.price <= max) score += 25;
    else if (property.price <= max * 1.2) score += 12; else score += 5;
  }
  if (property.type === selections.type) score += 25; else score += 5;
  const rooms = parseInt(selections.rooms);
  if (property.rooms === rooms) score += 20;
  else if (Math.abs(property.rooms - rooms) === 1) score += 12; else score += 3;
  if (selections.location === "הסביבה") score += 15;
  else if (property.location === selections.location) score += 20; else score += 5;
  switch (selections.priority) {
    case "cheap": score += property.price < 1500000 ? 10 : property.price < 2000000 ? 6 : 2; break;
    case "big": score += property.size >= 200 ? 10 : property.size >= 130 ? 7 : 3; break;
    case "investment": score += property.rooms <= 3 && property.price < 1500000 ? 10 : 4; break;
    case "family": score += property.rooms >= 4 && (property.type === "דירת גן" || property.type === "דו משפחתי" || property.type === "בית פרטי") ? 10 : property.rooms >= 4 ? 7 : 3; break;
    case "luxury": score += property.price >= 3000000 ? 10 : property.price >= 2000000 ? 7 : 3; break;
  }
  return Math.min(Math.round(score), 100);
}

const AIFinder = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: string) => {
    const key = steps[currentStep].key;
    const newSelections = { ...selections, [key]: value };
    setSelections(newSelections);
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 500);
    }
  };

  const reset = () => { setCurrentStep(0); setSelections({}); setShowResults(false); };

  const results = showResults
    ? properties.map((p) => ({ property: p, score: scoreProperty(p, selections) })).sort((a, b) => b.score - a.score).slice(0, 4)
    : [];

  const progress = showResults ? 100 : ((currentStep) / steps.length) * 100;

  if (isLoading) {
    return (
      <div className="pt-28 pb-16 min-h-screen container mx-auto px-4 max-w-2xl">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-5 py-2.5 rounded-full mb-6 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>מציאת נכס חכמה</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-4 leading-tight">
              בואו נמצא לכם
              <br />
              <span className="text-gold">את הנכס המושלם</span>
            </h1>
            <p className="text-muted-foreground">ענו על כמה שאלות ונמצא לכם את ההתאמה הטובה ביותר</p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2 uppercase tracking-wide">
              <span>שלב {showResults ? steps.length : currentStep + 1} מתוך {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </FadeIn>

        {!showResults ? (
          <FadeIn delay={200}>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-8">{steps[currentStep].title}</h2>
              <div className="grid gap-3">
                {steps[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-right p-5 rounded-xl border-2 transition-all duration-300 text-base font-medium hover:border-gold hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-md ${
                      selections[steps[currentStep].key] === opt.value
                        ? "border-gold bg-gold-light shadow-md"
                        : "border-border bg-background"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  className="mt-6 gap-2 text-muted-foreground"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowRight className="h-4 w-4" />
                  חזרה
                </Button>
              )}
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold font-playfair text-foreground mb-3">
                  הנכסים המתאימים ביותר עבורכם
                </h2>
                <p className="text-muted-foreground">מצאנו {results.length} נכסים שמתאימים להעדפות שלכם</p>
              </div>

              <div className="space-y-4">
                {results.map((r, i) => (
                  <div
                    key={r.property.id}
                    className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                      i === 0 ? "border-gold ring-2 ring-gold/20" : "border-border"
                    }`}
                  >
                    {i === 0 && (
                      <div className="bg-gold text-gold-foreground text-center py-2.5 text-sm font-bold tracking-wide">
                        ⭐ ההתאמה הטובה ביותר
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/properties/${r.property.id}`} className="block shrink-0">
                        <img
                          src={r.property.image}
                          alt={r.property.name}
                          className="w-full sm:w-52 h-44 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-5 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Link to={`/properties/${r.property.id}`} className="font-bold text-foreground hover:text-gold transition-colors duration-300 text-lg">{r.property.name}</Link>
                          <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1.5 rounded-full">
                            {r.score}% התאמה
                          </span>
                        </div>
                        <p className="text-gold font-bold text-lg mb-2">{formatPrice(r.property.price)}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {r.property.rooms} חד׳ · {r.property.size} מ״ר · {r.property.location}
                        </p>
                        <a href={generateWhatsAppLink(r.property)} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-xl">
                            <MessageCircle className="h-4 w-4" />
                            שלחו הודעה על הנכס הזה
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="outline" className="gap-2 rounded-full px-8" onClick={reset}>
                  <RotateCcw className="h-4 w-4" />
                  חיפוש חדש
                </Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default AIFinder;
