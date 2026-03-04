import { useParams, Link } from "react-router-dom";
import { ArrowRight, MapPin, BedDouble, Maximize, MessageCircle, Check } from "lucide-react";
import { formatPrice, generateWhatsAppLink } from "@/data/properties";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data: properties = [], isLoading } = useProperties();
  const property = properties.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-[4/3] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-24 w-full" />
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
            <Button variant="outline">חזרה לנכסים</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/properties" className="hover:text-gold transition-colors flex items-center gap-1">
            <ArrowRight className="h-4 w-4" />
            כל הנכסים
          </Link>
          <span>/</span>
          <span className="text-foreground">{property.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
              <img
                src={property.images[selectedImage]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            {property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {property.isNew && <Badge className="bg-gold text-gold-foreground border-0">חדש</Badge>}
              {property.isHot && <Badge className="bg-destructive text-destructive-foreground border-0">חם!</Badge>}
              <Badge variant="outline">{property.type}</Badge>
            </div>
            <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">{property.name}</h1>
            <p className="text-2xl font-bold text-gold mb-4">{formatPrice(property.price)}</p>

            <div className="flex items-center gap-6 text-muted-foreground mb-6 pb-6 border-b border-border flex-wrap">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {property.address}
              </span>
              <span className="flex items-center gap-2">
                <BedDouble className="h-5 w-5" />
                {property.rooms} חדרים
              </span>
              <span className="flex items-center gap-2">
                <Maximize className="h-5 w-5" />
                {property.size} מ״ר
              </span>
            </div>

            <h3 className="font-bold text-lg mb-2">תיאור הנכס</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{property.longDescription}</p>

            {property.features.length > 0 && (
              <>
                <h3 className="font-bold text-lg mb-3">מאפיינים</h3>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {property.features.map((f) => (
                    <span key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-gold" />
                      {f}
                    </span>
                  ))}
                </div>
              </>
            )}

            <a href={generateWhatsAppLink(property)} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 text-base">
                <MessageCircle className="h-5 w-5" />
                שלחו הודעה בוואטסאפ
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
