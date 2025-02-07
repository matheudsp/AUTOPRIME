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

export function EncodeWhatsAppMessage(whatsapp: string) {
  let text =
    "*Seja muito bem-vindo ao WhatsApp da CarShop! Estamos aqui para atendê-lo com todo o prazer.*\n";
  text +=
    "Para verificar o seu veículo, precisamos de algumas informações. Caso tenha alguma dúvida, fique à vontade para perguntar!\n\n";
  text += "*Seu nome:*\n";
  text += "*Cidade atual:*\n";
  text += "*Qual será a forma de pagamento. (A vista, Financiamento, PIX)*\n\n";
  text += "*Obrigado por escolher a CarShop!*";

  const encode = encodeURIComponent(text);
  const URL = `https://wa.me/${whatsapp}?text=${encode}`;
  return URL;
}
