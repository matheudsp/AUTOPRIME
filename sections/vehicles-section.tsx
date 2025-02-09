import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { computeVehicleTotalPrice } from "@/helpers/vehicle";
import { prismaClient } from "@/lib/prisma";
import VehicleItem from "@/components/vehicle-item";

interface VehicleSectionProps {
  categoryName: string;
}
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const VehiclesSection = async ({ categoryName }: VehicleSectionProps) => {
  const vehicles = await prismaClient.vehicle.findMany({
    ...(categoryName !== "Todos" && {
      where: { category: { name: categoryName } },
    }),
  });

  return (
    <div className="py-5">
      <Carousel className="mx-auto w-full max-w-7xl px-5">
        <CarouselContent>
        {vehicles.map((vehicle) => (
            <CarouselItem
              className="md:basis-1/3 lg:basis-1/4"
              key={vehicle.id}
            >
              <VehicleItem
                vehicle={computeVehicleTotalPrice(vehicle)}
                isAdminPage={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block">
          <CarouselNext />
          <CarouselPrevious />
        </div>
      </Carousel>
    </div>
  );
};

export default VehiclesSection;
