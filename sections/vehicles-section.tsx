import { Button } from "@/components/ui/button";
import VehicleItem from "@/components/vehicle-item";
import { computeVehicleTotalPrice } from "@/helpers/vehicle";
import { prismaClient } from "@/lib/prisma";
import Link from "next/link";

type VehiclesSectionProps = {
  searchParams: Promise<{ page?: string }>
};

const VehiclesSection = async ({ searchParams }: VehiclesSectionProps) => {
  const {page} = await searchParams;
  const currentPage =  Number(page) || 1;
  const vehiclesPerPage = 9;

  const [vehicles, totalVehicles] = await Promise.all([
    prismaClient.vehicle.findMany({
      skip: (currentPage - 1) * vehiclesPerPage,
      take: vehiclesPerPage,
    }),
    prismaClient.vehicle.count(),
  ]);

  const totalPages = Math.ceil(totalVehicles / vehiclesPerPage);

  return (
    <div className="py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto w-full max-w-7xl px-5 mt-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={computeVehicleTotalPrice(vehicle)}
              isAdminPage={false}
            />
          ))
        ) : (
          <p className="text-center mt-4">Nenhum veículo encontrado.</p>
        )}
      </div>

      {/* Paginação e Número de Veículos */}
      <div className="flex justify-between items-center text-sm text-gray-700 w-full max-w-7xl px-5 mt-4">
        <div className="flex items-center space-x-2">
          <p>
            Página {currentPage} de {totalPages}
          </p>
          <p>
            {totalVehicles} {totalVehicles === 1 ? "veículo" : "veículos"}
          </p>
        </div>

        <div className="flex space-x-3">
          {currentPage > 1 && (
            <Link href={`?page=${currentPage - 1}`}>
              <Button className="px-4 py-2 bg-primary rounded-lg transition duration-200">
                Anterior
              </Button>
            </Link>
          )}
          {currentPage < totalPages && (
            <Link href={`?page=${currentPage + 1}`}>
              <Button className="px-4 py-2 bg-primary rounded-lg transition duration-200">
                Próximo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehiclesSection;
