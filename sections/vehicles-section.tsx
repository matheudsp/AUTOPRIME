import FilterDrawer from "@/components/common/filter-sidebar";
import { EmptyStateVehicle } from "@/components/ui/animations";
import VehicleItem from "@/components/vehicle-item";
import VehiclePagination from "@/components/vehicle-pagination";
import { computeVehicleTotalPrice } from "@/helpers/vehicle";
import { prismaClient } from "@/lib/prisma";

type VehicleFilters = {
  categoryId?: string;
  year?: string;
  basePrice?: { gte?: number; lte?: number };
  transmission?: string;
  armored?: boolean;
};
type VehiclesSectionProps = {
  searchParams: { [key: string]: string | undefined };
};

const VehiclesSection = async ({ searchParams }: VehiclesSectionProps) => {
  const { page, category, armored, maxPrice, minPrice, transmission, year } =
    await searchParams;
  const currentPage = Number(page) || 1;
  const vehiclesPerPage = 9;

  const filters: VehicleFilters = {};
  if (category) filters.categoryId = category;
  if (year) filters.year = year;
  if (minPrice) filters.basePrice = { gte: Number(minPrice) };
  if (maxPrice)
    filters.basePrice = { ...filters.basePrice, lte: Number(maxPrice) };
  if (transmission) filters.transmission = transmission;
  if (armored) filters.armored = armored === "true";

  const [vehicles, totalVehicles, categories, distinctYears] =
    await Promise.all([
      prismaClient.vehicle.findMany({
        where: filters,
        skip: (currentPage - 1) * vehiclesPerPage,
        take: vehiclesPerPage,
      }),
      prismaClient.vehicle.count({
        where: filters,
      }),
      prismaClient.category.findMany({
        select: { id: true, name: true },
      }),
      prismaClient.vehicle.findMany({
        distinct: ["year"],
        select: { year: true },
      }),
    ]);

  const totalPages = Math.ceil(totalVehicles / vehiclesPerPage);

  return (
    <div className="max-w-7xl w-full p-5 mx-auto">
      <FilterDrawer
        vehicleCategories={categories}
        vehicleYears={distinctYears}
      />

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto w-full mt-4">
          {vehicles.map((vehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={computeVehicleTotalPrice(vehicle)}
              isAdminPage={false}
            />
          ))}
        </div>
      ) : (
        <EmptyStateVehicle />
      )}

      <VehiclePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalVehicles={totalVehicles}
      />
    </div>
  );
};

export default VehiclesSection;
