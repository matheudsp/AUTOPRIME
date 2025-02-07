import VehicleItem from "@/components/vehicle-item";
import { computeVehicleTotalPrice } from "@/helpers/vehicle";
import { prismaClient } from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    search?: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }

  const vehicles = await prismaClient.vehicle.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl p-5">
      <h1 className="flex items-center gap-2 text-xl font-semibold dark:text-white">
        Exibindo resultados de pesquisa para &quot;{searchParams.search}&quot;
      </h1>

      {vehicles.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {vehicles.map((vehicle: Vehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={computeVehicleTotalPrice(vehicle)}
              isAdminPage={false}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm font-light">
            Oops! Não foi possível encontrar algo com o termo pesquisado.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
