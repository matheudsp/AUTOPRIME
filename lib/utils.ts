import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(whatsapp: string) {
  const cleanedPhoneNumber = whatsapp.replace(/\D/g, "");
  if (cleanedPhoneNumber.length === 11) {
    const areaCode = cleanedPhoneNumber.slice(0, 2);
    const firstPart = cleanedPhoneNumber.slice(2, 7);
    const secondPart = cleanedPhoneNumber.slice(7);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  } else {
    return whatsapp;
  }
}

export function EncodeWhatsAppMessage(
  whatsapp: string,
  vehicleName: string,
  vehicleModel:string,
  vehicleVersion: string,
  vehicleEndPlate:number | null = null,
  vehicleKm: string | null = null
) {
  const whatsappFormatted = whatsapp.replace(/\s/g, '');

  let text = `*Olá, equipe Autoprime!* 👋\n\n`;
  text += `Tenho interesse no veículo *${vehicleName} ${vehicleModel} ${vehicleVersion}`;
  if (vehicleEndPlate) {
    text += ` (final da placa ${vehicleEndPlate})`;
  }

  if (vehicleKm && vehicleKm.trim() === '0') {
    text += ` 0KM`;
  }
  text += `* e gostaria de obter mais informações.\n\n`;

  const encodedMessage = encodeURIComponent(text);

  return `https://wa.me/${whatsappFormatted}?text=${encodedMessage}`;
}

export function sortYearsDescending(years: { year: string }[]): { year: string }[] {
  return years
    .map(year => ({ year: Number(year.year) })) // Converte para número e mantém o formato { year: number }
    .filter(year => !isNaN(year.year)) // Filtra valores inválidos
    .sort((a, b) => b.year - a.year) // Ordena em ordem decrescente
    .map(year => ({ year: year.year.toString() })); // Converte de volta para { year: string }
}

