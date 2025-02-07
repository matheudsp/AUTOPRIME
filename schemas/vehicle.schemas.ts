
import { z } from "zod";
import { Tags, tagTranslation } from "@/helpers/tag-translation";

export const newVehicleSchema = z.object({
  cover: z.string().optional(),
  name: z
    .string({ required_error: "Campo obrigatório!" })
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  model: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório")
    .max(30, "Máximo de 30 caracteres"),
  version: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório")
    .max(30, "Máximo de 30 caracteres"),
  year: z
    .string({ required_error: "Campo obrigatório!" })
    .refine((value) => /^\d{4}$|^\d{4}\/\d{4}$/.test(value), {
      message: "Ano inválido (deve ser XXXX ou XXXX/XXXX)",
    }),
  km: z
    .string({ required_error: "Campo obrigatório!" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Apenas números são permitidos",
    }),
  gas: z.string({ required_error: "Campo obrigatório!" }),
  plateEnd: z.string().optional(),
  whatsApp: z.string().optional(),
  transmission: z.string({ required_error: "Campo obrigatório!" }),
  armored: z.string({ required_error: "Campo obrigatório!" }),
  basePrice: z
    .string({ required_error: "Campo obrigatório!" })
    .refine((value) => /^[0-9]+([.,][0-9]+)?$/.test(value), {
      message: "Deve ser um número ou número decimal",
    }),
  discountPercentage: z
    .string()
    .refine((value) => value === "" || /^[0-9]+([.,][0-9]+)?$/.test(value), {
      message: "Deve ser um número ou número decimal",
    })
    .optional(),
  description: z.string().optional(),
  category: z.string({ required_error: "Campo obrigatório!" }),
  specialTag: z
    .string({ required_error: "Campo obrigatório!" })
    .refine((val) => Object.values(Tags).includes(val as Tags)),
  images: z.array(z.string()).optional(),
});