import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";

const types = ["הכל", "דירה", "פנטהאוז", "בית פרטי", "דו משפחתי", "דירת גן"];
const locations = ["הכל", "אשדוד", "אשקלון", "יבנה", "גן יבנה"];

const Properties = () => {
  const [typeFilter, setTypeFilter] = useState("הכל");
  const [locationFilter, setLocationFilter] = useState("הכל");

  const filtered = properties.filter((p) => {
    if (typeFilter !== "הכל" && p.type !== typeFilter) return false;
    if (locationFilter !== "הכל" && p.location !== locationFilter) return false;
    return true;
  });

  return (
    <div className="pt-20 md:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">כל הנכסים</h1>
          <p className="text-muted-foreground">מבחר נכסים באשדוד והסביבה</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <span className="text-sm font-medium text-foreground mb-2 block">סוג נכס:</span>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={typeFilter === t ? "default" : "outline"}
                  className={typeFilter === t ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""}
                  onClick={() => setTypeFilter(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-foreground mb-2 block">מיקום:</span>
            <div className="flex flex-wrap gap-2">
              {locations.map((l) => (
                <Button
                  key={l}
                  size="sm"
                  variant={locationFilter === l ? "default" : "outline"}
                  className={locationFilter === l ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""}
                  onClick={() => setLocationFilter(l)}
                >
                  {l}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} נכסים נמצאו</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">לא נמצאו נכסים בקריטריונים שנבחרו</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
