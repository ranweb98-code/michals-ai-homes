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
    <div className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
      <Link to={`/properties/${property.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {property.isNew && (
            <Badge className="bg-gold text-gold-foreground border-0">חדש</Badge>
          )}
          {property.isHot && (
            <Badge className="bg-destructive text-destructive-foreground border-0">חם!</Badge>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
          <span className="text-primary-foreground font-bold text-xl">{formatPrice(property.price)}</span>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/properties/${property.id}`}>
          <h3 className="font-bold text-lg text-foreground mb-1 hover:text-gold transition-colors">{property.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">{property.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {property.location}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            {property.rooms} חד׳
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            {property.size} מ״ר
          </span>
        </div>
        <a href={generateWhatsAppLink(property)} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
            <MessageCircle className="h-4 w-4" />
            שלחו הודעה בוואטסאפ
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
