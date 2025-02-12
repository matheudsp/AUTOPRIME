"use server";

import { prismaClient } from "@/lib/prisma";
import { Tags } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

interface createVehicleProps {
  data: {
    cover?: string;
    name: string;
    model: string;
    version: string;
    year: string;
    km?: string | undefined;
    basePrice: number;
    discountPercentage?: number;
    description?: string | undefined;
    gas: string;
    plateEnd?: number | null;
    transmission: string;
    whatsApp?: string | undefined;
    armored?: boolean | undefined;
    category: string;
    specialTag: Tags;
    images: string[];
  };
}

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = `${baseSlug}-${uuidv4().slice(0, 4)}`;
  let exists = await prismaClient.vehicle.findUnique({
    where: { slug },
  });

  // Gera novo slug se já existir
  while (exists) {
    slug = `${baseSlug}-${uuidv4().slice(0, 4)}`;
    exists = await prismaClient.vehicle.findUnique({ where: { slug } });
  }

  return slug;
}

export const createVehicle = async ({ data }: createVehicleProps) => {
  const baseSlug = data.name.toLowerCase().replace(/\s+/g, "-");
  const slug = await generateUniqueSlug(baseSlug + "-" + data.model);

  try {
    await prismaClient.vehicle.create({
      data: {
        id: uuidv4(),
        cover: data.cover,
        model: data.model,
        version: data.version,
        year: data.year,
        km: data.km,
        gas: data.gas,
        plateEnd: data.plateEnd,
        transmission: data.transmission,
        whatsApp: data.whatsApp,
        name: data.name,
        slug: slug,
        basePrice: data.basePrice,
        description: data.description,
        armored: data.armored,
        discountPercentage: data.discountPercentage,
        categoryId: data.category,
        specialTag: data.specialTag,
        images: {
          create: data.images.map((url) => ({
            url,
          })),
        },
      },
    });

    return { success: true, message: "Veículo criado com sucesso." };
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    throw new Error("Falha ao criar veículo.");
  }
};
