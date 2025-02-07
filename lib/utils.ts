import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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