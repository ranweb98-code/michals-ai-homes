import { useState, useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/data/properties";
import { Skeleton } from "@/components/ui/skeleton";

const Properties = () => {
  const { data: properties = [], isLoading, error } = useProperties();

  const [cityFilter, setCityFilter] = useState("הכל");
  const [roomsFilter, setRoomsFilter] = useState("הכל");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 500]);

  const cities = useMemo(() => {
    const set = new Set(properties.map((p) => p.location));
    return ["הכל", ...Array.from(set).sort()];
  }, [properties]);

  const roomOptions = useMemo(() => {
    const set = new Set(properties.map((p) => p.rooms));
    return ["הכל", ...Array.from(set).sort((a, b) => a - b).map(String)];
  }, [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (cityFilter !== "הכל" && p.location !== cityFilter) return false;
      if (roomsFilter !== "הכל" && p.rooms !== parseInt(roomsFilter)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.size < sizeRange[0] || p.size > sizeRange[1]) return false;
      return true;
    });
  }, [properties, cityFilter, roomsFilter, priceRange, sizeRange]);

  if (error) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">שגיאה בטעינת נכסים</h1>
          <p className="text-muted-foreground">נסו לרענן את הדף</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">כל הנכסים</h1>
          <p className="text-muted-foreground">מבחר נכסים באשדוד והסביבה</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-card border border-border rounded-xl p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* City */}
            <div>
              <span className="text-sm font-medium text-foreground mb-2 block">מיקום:</span>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    variant={cityFilter === c ? "default" : "outline"}
                    className={cityFilter === c ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""}
                    onClick={() => setCityFilter(c)}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <span className="text-sm font-medium text-foreground mb-2 block">חדרים:</span>
              <div className="flex flex-wrap gap-2">
                {roomOptions.map((r) => (
                  <Button
                    key={r}
                    size="sm"
                    variant={roomsFilter === r ? "default" : "outline"}
                    className={roomsFilter === r ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""}
                    onClick={() => setRoomsFilter(r)}
                  >
                    {r === "הכל" ? r : `${r} חד׳`}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Price range */}
          <div>
            <span className="text-sm font-medium text-foreground mb-2 block">
              טווח מחיר: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
            </span>
            <div className="px-2">
              <Slider
                min={0}
                max={10000000}
                step={100000}
                value={priceRange}
                onValueChange={(v) => setPriceRange(v as [number, number])}
                className="w-full"
              />
            </div>
          </div>

          {/* Size range */}
          <div>
            <span className="text-sm font-medium text-foreground mb-2 block">
              גודל: {sizeRange[0]} מ״ר – {sizeRange[1]} מ״ר
            </span>
            <div className="px-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={sizeRange}
                onValueChange={(v) => setSizeRange(v as [number, number])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
