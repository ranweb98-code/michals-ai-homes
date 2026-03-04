import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties, Property, formatPrice, generateWhatsAppLink } from "@/data/properties";
import { Progress } from "@/components/ui/progress";

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

function scoreProperty(
  property: Property,
  selections: Record<string, string>
): number {
  let score = 0;
  const maxScore = 100;

  // Budget
  const budget = parseInt(selections.budget);
  if (budget === 3000001) {
    if (property.price >= 3000000) score += 25;
    else score += 10;
  } else {
    const budgetRanges: Record<string, [number, number]> = {
      "1000000": [0, 1000000],
      "1500000": [1000000, 1500000],
      "2000000": [1500000, 2000000],
      "3000000": [2000000, 3000000],
    };
    const [min, max] = budgetRanges[selections.budget] || [0, 999999999];
    if (property.price >= min && property.price <= max) score += 25;
    else if (property.price <= max * 1.2) score += 12;
    else score += 5;
  }

  // Type
  if (property.type === selections.type) score += 25;
  else score += 5;

  // Rooms
  const rooms = parseInt(selections.rooms);
  if (property.rooms === rooms) score += 20;
  else if (Math.abs(property.rooms - rooms) === 1) score += 12;
  else score += 3;

  // Location
  if (selections.location === "הסביבה") {
    score += 15;
  } else if (property.location === selections.location) {
    score += 20;
  } else {
    score += 5;
  }

  // Priority
  switch (selections.priority) {
    case "cheap":
      score += property.price < 1500000 ? 10 : property.price < 2000000 ? 6 : 2;
      break;
    case "big":
      score += property.size >= 200 ? 10 : property.size >= 130 ? 7 : 3;
      break;
    case "investment":
      score += property.rooms <= 3 && property.price < 1500000 ? 10 : 4;
      break;
    case "family":
      score += property.rooms >= 4 && (property.type === "דירת גן" || property.type === "דו משפחתי" || property.type === "בית פרטי") ? 10 : property.rooms >= 4 ? 7 : 3;
      break;
    case "luxury":
      score += property.price >= 3000000 ? 10 : property.price >= 2000000 ? 7 : 3;
      break;
  }

  return Math.min(Math.round(score), maxScore);
}

const AIFinder = () => {
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

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setShowResults(false);
  };

  const results = showResults
    ? properties
        .map((p) => ({ property: p, score: scoreProperty(p, selections) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
    : [];

  const progress = showResults ? 100 : ((currentStep) / steps.length) * 100;

  return (
    <div className="pt-20 md:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">מציאת נכס חכמה</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">
            בואו נמצא לכם את הנכס המושלם
          </h1>
          <p className="text-muted-foreground">ענו על כמה שאלות ונמצא לכם את ההתאמה הטובה ביותר</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>שלב {showResults ? steps.length : currentStep + 1} מתוך {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {!showResults ? (
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">{steps[currentStep].title}</h2>
            <div className="grid gap-3">
              {steps[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-right p-4 rounded-lg border-2 transition-all text-base font-medium hover:border-gold hover:bg-gold-light ${
                    selections[steps[currentStep].key] === opt.value
                      ? "border-gold bg-gold-light"
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
                className="mt-4 gap-2"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ArrowRight className="h-4 w-4" />
                חזרה
              </Button>
            )}
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-playfair text-foreground mb-2">
                🎯 הנכסים המתאימים ביותר עבורכם
              </h2>
              <p className="text-muted-foreground">מצאנו {results.length} נכסים שמתאימים להעדפות שלכם</p>
            </div>

            <div className="space-y-4">
              {results.map((r, i) => (
                <div
                  key={r.property.id}
                  className={`bg-card border rounded-xl overflow-hidden ${
                    i === 0 ? "border-gold ring-2 ring-gold/20" : "border-border"
                  }`}
                >
                  {i === 0 && (
                    <div className="bg-gold text-gold-foreground text-center py-2 text-sm font-bold">
                      ⭐ ההתאמה הטובה ביותר
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row">
                    <Link to={`/properties/${r.property.id}`} className="block shrink-0">
                      <img
                        src={r.property.image}
                        alt={r.property.name}
                        className="w-full sm:w-48 h-40 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Link to={`/properties/${r.property.id}`} className="font-bold text-foreground hover:text-gold transition-colors">{r.property.name}</Link>
                        <span className="text-sm font-bold text-gold bg-gold/10 px-2 py-1 rounded">
                          {r.score}% התאמה
                        </span>
                      </div>
                      <p className="text-gold font-bold mb-1">{formatPrice(r.property.price)}</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {r.property.rooms} חד׳ · {r.property.size} מ״ר · {r.property.location}
                      </p>
                      <a href={generateWhatsAppLink(r.property)} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                          <MessageCircle className="h-4 w-4" />
                          שלחו הודעה על הנכס הזה
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="gap-2" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                חיפוש חדש
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFinder;
