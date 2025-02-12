'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface VehiclePaginationProps {
  currentPage: number;
  totalPages: number;
  totalVehicles: number;
}

const VehiclePagination = ({currentPage,totalPages,totalVehicles}:VehiclePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Criar um novo objeto com os parâmetros da URL atual
  const currentParams = new URLSearchParams(searchParams.toString());

  const handlePagination = (newPage: number) => {
    currentParams.set("page", newPage.toString());
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex justify-between items-center text-sm text-gray-700 w-full max-w-7xl px-5 mt-4">
      <div className="flex-col w-full space-x-2">
        <p className="text-center">
          Página {currentPage} de {totalPages}
        </p>
        <p className="text-center">
          {totalVehicles} {totalVehicles === 1 ? "veículo" : "veículos"}
        </p>
      </div>

      <div className="flex space-x-3">
        {currentPage > 1 && (
          <Button
            onClick={() => handlePagination(currentPage - 1)}
            className="px-4 py-2 bg-primary rounded-lg transition duration-200"
          >
            Anterior
          </Button>
        )}

        {currentPage < totalPages && (
          <Button
            onClick={() => handlePagination(currentPage + 1)}
            className="px-4 py-2 bg-primary rounded-lg transition duration-200"
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
};
export default VehiclePagination;
