"use server";

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteVehicle = async (vehicleId: string) => {
  await prismaClient.vehicle.delete({
    where: {
      id: vehicleId,
    },
  });

  revalidatePath("/admin/list/vehicles");
  revalidatePath("/");
};