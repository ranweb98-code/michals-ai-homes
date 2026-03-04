import { Property } from "@/data/properties";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1353uIis39F6gb8RBgWX3_so1UalasRTSWVzCfiYITyU/export?format=csv";

function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view...
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (openMatch) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  // Format: https://drive.google.com/uc?id=FILE_ID (already direct, ensure export=view)
  const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([^&]+)/);
  if (ucMatch && !url.includes('export=view')) {
    return `https://drive.google.com/uc?export=view&id=${ucMatch[1]}`;
  }

  return url;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row;
  });
}

function rowToProperty(row: Record<string, string>): Property {
  const images: string[] = [];
  const mainImage = row["image_main"] || "";
  if (mainImage) images.push(mainImage);
  for (let i = 1; i <= 5; i++) {
    const img = row[`image_${i}`];
    if (img) images.push(img);
  }

  const features: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const f = row[`feature_${i}`];
    if (f) features.push(f);
  }

  const status = (row["status"] || "").toLowerCase();

  return {
    id: row["id"] || crypto.randomUUID(),
    name: row["title"] || "",
    type: (row["type"] as Property["type"]) || "דירה",
    price: parseInt(row["price"]) || 0,
    rooms: parseInt(row["rooms"]) || 0,
    size: parseInt(row["size"]) || 0,
    location: row["city"] || "",
    address: row["address"] || row["city"] || "",
    description: row["description"] || "",
    longDescription: row["description"] || "",
    image: mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
    features,
    isNew: status === "new" || status === "חדש",
    isHot: status === "hot" || status === "חם",
  };
}

export async function fetchPropertiesFromSheet(): Promise<Property[]> {
  const response = await fetch(SHEET_CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.status}`);
  }
  const csv = await response.text();
  const rows = parseCSV(csv);
  return rows.map(rowToProperty).filter((p) => p.name);
}
