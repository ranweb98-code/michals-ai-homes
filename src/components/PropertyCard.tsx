import { Link } from "react-router-dom";
import { MapPin, BedDouble, Maximize, MessageCircle } from "lucide-react";
import { Property, formatPrice, generateWhatsAppLink } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500 hover:-translate-y-1">
      <Link to={`/properties/${property.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 flex gap-2">
          {property.isNew && (
            <Badge className="bg-gold text-gold-foreground border-0 shadow-lg text-xs px-3 py-1">חדש</Badge>
          )}
          {property.isHot && (
            <Badge className="bg-destructive text-destructive-foreground border-0 shadow-lg text-xs px-3 py-1">חם!</Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-primary-foreground font-bold text-2xl drop-shadow-lg">{formatPrice(property.price)}</span>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/properties/${property.id}`}>
          <h3 className="font-bold text-lg text-foreground mb-2 hover:text-gold transition-colors duration-300 line-clamp-1">{property.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{property.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5 pb-5 border-b border-border">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            {property.location}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5 text-gold" />
            {property.rooms} חד׳
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-gold" />
            {property.size} מ״ר
          </span>
        </div>
        <a href={generateWhatsAppLink(property)} target="_blank" rel="noopener noreferrer" className="w-full block">
          <Button className="w-full bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-xl h-11 transition-all hover:shadow-lg">
            <MessageCircle className="h-4 w-4" />
            שלחו הודעה בוואטסאפ
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
