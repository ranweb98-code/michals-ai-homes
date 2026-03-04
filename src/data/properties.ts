export interface Property {
  id: string;
  name: string;
  type: "דירה" | "פנטהאוז" | "בית פרטי" | "דו משפחתי" | "דירת גן";
  price: number;
  rooms: number;
  size: number;
  location: string;
  address: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  features: string[];
  isNew?: boolean;
  isHot?: boolean;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppLink = (property: Property): string => {
  const message = encodeURIComponent(
    `Hello Michal,\n\nI'm interested in this property:\n\nProperty: ${property.name}\nCity: ${property.location}\nPrice: ${formatPrice(property.price)}\nRooms: ${property.rooms}\n\nPlease send me more details.`
  );
  return `https://wa.me/972534213841?text=${message}`;
};
