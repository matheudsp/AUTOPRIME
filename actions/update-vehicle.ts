"use server";

import { prismaClient } from "@/lib/prisma";
import { Tags } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateVehicleProps {
  vehicleId: string;
  data: {
    name: string;
    basePrice: number;
    discountPercentage: number;
    description: string;
    specialTag: Tags;
  };
}

export const updateVehicle = async ({ data, vehicleId }: UpdateVehicleProps) => {
  try {
    const existingVehicle = await prismaClient.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!existingVehicle) {
      throw new Error("Veículo não encontrado");
    }

    await prismaClient.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        discountPercentage: data.discountPercentage,
        specialTag: data.specialTag,
      },
    });

    revalidatePath("/admin/list/vehicles");
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    throw error;
  }
};
