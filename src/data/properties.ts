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

export const properties: Property[] = [
  {
    id: "1",
    name: "דירת יוקרה ברובע הים",
    type: "דירה",
    price: 2800000,
    rooms: 5,
    size: 130,
    location: "אשדוד",
    address: "רובע הים, אשדוד",
    description: "דירה מרווחת עם נוף לים, גימור ברמה גבוהה",
    longDescription: "דירת 5 חדרים מדהימה ברובע הים של אשדוד. הדירה משופצת ברמה גבוהה עם חומרי גימור יוקרתיים, מטבח מודרני מאובזר, סלון גדול עם נוף פתוח לים. מרפסת שמש רחבה, 2 חניות ומחסן. קרוב לחוף הים ולפרומנדה.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    ],
    features: ["נוף לים", "מרפסת שמש", "2 חניות", "מחסן", "מעלית"],
    isNew: true,
  },
  {
    id: "2",
    name: "פנטהאוז מפואר ברובע יד",
    type: "פנטהאוז",
    price: 4500000,
    rooms: 6,
    size: 200,
    location: "אשדוד",
    address: "רובע יד, אשדוד",
    description: "פנטהאוז מרהיב עם מרפסת ענקית ונוף פנורמי",
    longDescription: "פנטהאוז מדהים בן 6 חדרים ברובע יד באשדוד. הנכס כולל מרפסת גג ענקית של 80 מ״ר עם נוף פנורמי לים ולעיר. סלון כפול, מטבח שף, סוויטת הורים מפנקת עם ג׳קוזי. 2 חניות מקורות ומחסן גדול.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    ],
    features: ["מרפסת גג 80 מ״ר", "נוף פנורמי", "ג׳קוזי", "2 חניות", "מחסן"],
    isHot: true,
  },
  {
    id: "3",
    name: "בית פרטי במרינה",
    type: "בית פרטי",
    price: 5500000,
    rooms: 7,
    size: 280,
    location: "אשדוד",
    address: "שכונת המרינה, אשדוד",
    description: "בית פרטי מרהיב עם בריכה וגינה מטופחת",
    longDescription: "בית פרטי יוקרתי בשכונת המרינה באשדוד. הבית בנוי על מגרש של 400 מ״ר עם בריכת שחייה פרטית וגינה מעוצבת. 7 חדרים כולל סוויטת הורים, חדר עבודה, וסלון כפול. מטבח שף מקצועי, מרתף יינות, וחניה ל-3 רכבים.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    ],
    features: ["בריכה פרטית", "גינה מעוצבת", "מרתף יינות", "3 חניות", "חדר עבודה"],
  },
  {
    id: "4",
    name: "דירת 4 חדרים ברובע ו׳",
    type: "דירה",
    price: 1650000,
    rooms: 4,
    size: 100,
    location: "אשדוד",
    address: "רובע ו׳, אשדוד",
    description: "דירה מרווחת במיקום מעולה, קרוב לכל",
    longDescription: "דירת 4 חדרים מרווחת ברובע ו׳ באשדוד. הדירה שופצה לאחרונה וכוללת מטבח חדש, ריצוף חדש ותריסים חשמליים. קומה 3 עם מעלית, מרפסת פונה לדרום, חניה ומחסן. קרוב לבתי ספר, גנים ומרכז מסחרי.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      "https://images.unsplash.com/photo-1600573472591-ee6981cf81d6?w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
    ],
    features: ["משופצת", "מרפסת", "חניה", "מחסן", "מעלית"],
  },
  {
    id: "5",
    name: "דירת גן ברובע ח׳",
    type: "דירת גן",
    price: 2100000,
    rooms: 5,
    size: 120,
    location: "אשדוד",
    address: "רובע ח׳, אשדוד",
    description: "דירת גן מהממת עם גינה פרטית גדולה",
    longDescription: "דירת גן מדהימה בן 5 חדרים ברובע ח׳ באשדוד. הדירה כוללת גינה פרטית של 60 מ״ר, כניסה נפרדת, מטבח מודרני וסלון מרווח. אידיאלית למשפחות עם ילדים. 2 חניות ומחסן.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    ],
    features: ["גינה 60 מ״ר", "כניסה נפרדת", "2 חניות", "מחסן", "מעלית"],
    isNew: true,
  },
  {
    id: "6",
    name: "דו משפחתי ביבנה",
    type: "דו משפחתי",
    price: 3200000,
    rooms: 6,
    size: 220,
    location: "יבנה",
    address: "שכונת נאות רבין, יבנה",
    description: "דו משפחתי חדש עם גינה ומרפסת גג",
    longDescription: "דו משפחתי חדש ומרווח בשכונת נאות רבין ביבנה. 6 חדרים על 3 קומות, גינה מעוצבת, מרפסת גג עם נוף, מטבח שף, סוויטת הורים מפנקת. שכונה שקטה ומשפחתית, קרוב לפארקים ולבתי ספר.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    ],
    features: ["גינה", "מרפסת גג", "3 קומות", "2 חניות", "חדר כביסה"],
  },
  {
    id: "7",
    name: "דירת 3 חדרים באשקלון",
    type: "דירה",
    price: 1200000,
    rooms: 3,
    size: 80,
    location: "אשקלון",
    address: "ברנע, אשקלון",
    description: "דירה מושקעת במחיר אטרקטיבי, מתאימה להשקעה",
    longDescription: "דירת 3 חדרים מושקעת בשכונת ברנע באשקלון. הדירה משופצת ומוכנה למגורים, מטבח חדש, אמבטיה חדשה. קומה 2 עם מעלית. מתאימה מאוד להשקעה או לזוגות צעירים. קרוב לחוף הים ולמרכז העיר.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    ],
    features: ["משופצת", "מעלית", "קרוב לחוף", "חניה", "מרפסת"],
  },
  {
    id: "8",
    name: "פנטהאוז בגן יבנה",
    type: "פנטהאוז",
    price: 2400000,
    rooms: 5,
    size: 160,
    location: "גן יבנה",
    address: "מרכז העיר, גן יבנה",
    description: "פנטהאוז חדש עם מרפסת גג ונוף מרהיב",
    longDescription: "פנטהאוז חדש ומרהיב בגן יבנה. 5 חדרים עם מרפסת גג פרטית של 50 מ״ר. נוף פתוח לכל הכיוונים. גימור ברמה גבוהה, מטבח מודרני, סוויטת הורים. בניין חדש עם מעלית ולובי מפואר. 2 חניות ומחסן.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    ],
    features: ["מרפסת גג 50 מ״ר", "נוף פתוח", "בניין חדש", "2 חניות", "מחסן"],
  },
  {
    id: "10",
    name: "בית פרטי ביבנה",
    type: "בית פרטי",
    price: 3800000,
    rooms: 6,
    size: 240,
    location: "יבנה",
    address: "שכונת הפארק, יבנה",
    description: "בית פרטי מרווח עם גינה גדולה ובריכה",
    longDescription: "בית פרטי מרשים בשכונת הפארק ביבנה. 6 חדרים על מגרש של 350 מ״ר, גינה מעוצבת עם בריכה קטנה. הבית כולל סלון גדול, מטבח שף, חדר משפחה, וסוויטת הורים. חניה ל-2 רכבים ומחסן. שכונה שקטה ויוקרתית.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    features: ["בריכה", "גינה מעוצבת", "חדר משפחה", "2 חניות", "מחסן"],
  },
  {
    id: "11",
    name: "דירת 2 חדרים להשקעה",
    type: "דירה",
    price: 850000,
    rooms: 2,
    size: 55,
    location: "אשקלון",
    address: "מרכז העיר, אשקלון",
    description: "דירת השקעה מצוינת במחיר נמוך עם תשואה גבוהה",
    longDescription: "דירת 2 חדרים במרכז אשקלון, מושלמת להשקעה. הדירה מושכרת בתשואה גבוהה ונמצאת במיקום מרכזי עם נגישות לתחבורה ציבורית. משופצת ומוכנה. קומה 1 עם חניה.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
    images: [
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    ],
    features: ["מושכרת", "משופצת", "מיקום מרכזי", "חניה", "תשואה גבוהה"],
    isHot: true,
  },
  {
    id: "12",
    name: "דירת גן בגן יבנה",
    type: "דירת גן",
    price: 1750000,
    rooms: 4,
    size: 105,
    location: "גן יבנה",
    address: "שכונה צעירה, גן יבנה",
    description: "דירת גן חדשה עם גינה פרטית, מושלמת למשפחות",
    longDescription: "דירת גן חדשה בת 4 חדרים בגן יבנה. גינה פרטית של 50 מ״ר, כניסה נפרדת, מטבח מודרני מרווח. שכונה צעירה ומשפחתית עם גנים ובתי ספר בסביבה. חניה ומחסן.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    ],
    features: ["גינה 50 מ״ר", "כניסה נפרדת", "חדשה", "חניה", "מחסן"],
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppLink = (property: Property): string => {
  const message = encodeURIComponent(
    `שלום מיכל,\nראיתי באתר שלך את הנכס הבא ואני מעוניין לקבל פרטים נוספים:\n\nשם הנכס: ${property.name}\nמיקום: ${property.address}\nמחיר: ${formatPrice(property.price)}\nמספר חדרים: ${property.rooms}\n\nאשמח לשמוע פרטים נוספים.`
  );
  return `https://wa.me/972534213841?text=${message}`;
};
