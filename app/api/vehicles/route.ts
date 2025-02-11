import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const category = searchParams.get("category");
  const armored = searchParams.get("armored");
  const year = searchParams.get("year");

  const vehicles = await prismaClient.vehicle.findMany({
    where: {
      ...(minPrice && { price: { gte: +minPrice } }),
      ...(maxPrice && { price: { lte: +maxPrice } }),
      ...(category !== "Todos" && { category: { name: category } }),
      ...(armored !== undefined && { armored: armored ? "true" : "false" }), // Convertendo boolean para string
      ...(year && { year: { equals: year.toString() } }), // Convertendo para string
    },
  });
  
  return NextResponse.json(vehicles);
}
