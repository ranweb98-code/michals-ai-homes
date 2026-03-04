import { useParams, Link } from "react-router-dom";
import { ArrowRight, MapPin, BedDouble, Maximize, MessageCircle, Check } from "lucide-react";
import { formatPrice, generateWhatsAppLink } from "@/data/properties";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data: properties = [], isLoading } = useProperties();
  const property = properties.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">הנכס לא נמצא</h1>
          <Link to="/properties">
            <Button variant="outline" className="rounded-full">חזרה לנכסים</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <FadeIn>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/properties" className="hover:text-gold transition-colors duration-300 flex items-center gap-1">
              <ArrowRight className="h-4 w-4" />
              כל הנכסים
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{property.name}</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Gallery */}
          <FadeIn>
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-xl shadow-foreground/5">
                <img
                  src={property.images[selectedImage]}
                  alt={property.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 hover:opacity-90 ${
                        selectedImage === i ? "border-gold shadow-md" : "border-transparent opacity-60 hover:opacity-80"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={200}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                {property.isNew && <Badge className="bg-gold text-gold-foreground border-0 rounded-full px-3">חדש</Badge>}
                {property.isHot && <Badge className="bg-destructive text-destructive-foreground border-0 rounded-full px-3">חם!</Badge>}
                <Badge variant="outline" className="rounded-full">{property.type}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3 leading-tight">{property.name}</h1>
              <p className="text-3xl font-bold text-gold mb-6">{formatPrice(property.price)}</p>

              <div className="flex items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border flex-wrap">
                <span className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-gold" />
                  </div>
                  {property.address}
                </span>
                <span className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <BedDouble className="h-4 w-4 text-gold" />
                  </div>
                  {property.rooms} חדרים
                </span>
                <span className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Maximize className="h-4 w-4 text-gold" />
                  </div>
                  {property.size} מ״ר
                </span>
              </div>

              <h3 className="font-bold text-lg mb-3">תיאור הנכס</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">{property.longDescription}</p>

              {property.features.length > 0 && (
                <>
                  <h3 className="font-bold text-lg mb-4">מאפיינים</h3>
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {property.features.map((f) => (
                      <span key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary rounded-xl px-4 py-3">
                        <Check className="h-4 w-4 text-gold shrink-0" />
                        {f}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <a href={generateWhatsAppLink(property)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-foreground hover:bg-foreground/90 text-background gap-2 text-base rounded-xl h-14 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                  <MessageCircle className="h-5 w-5" />
                  שלחו הודעה בוואטסאפ
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
