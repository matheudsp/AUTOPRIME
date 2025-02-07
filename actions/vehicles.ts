"use server";

import { prismaClient } from "@/lib/prisma";
import { Vehicle } from "@prisma/client";

export const vehicles = async (): Promise<Vehicle[]> => {
  const vehiclesData = await prismaClient.vehicle.findMany({
    orderBy: {
      categoryId: "asc",
    },
  });
  return vehiclesData;
};
