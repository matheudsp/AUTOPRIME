import { prismaClient } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EncodeWhatsAppMessage, formatPhoneNumber } from "@/lib/utils";
import VehicleImages from "@/components/vehicle-images";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { computeVehicleTotalPrice } from "@/helpers/vehicle";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

const VehiclePage = async ({ params }: VehiclePageProps) => {
  const { slug } = await params;
  const vehicle = await prismaClient.vehicle.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
    },
  });

  if (!vehicle) {
    notFound();
  }

  // Calcula o preço total com base no desconto
  const vehicleWithTotalPrice = computeVehicleTotalPrice(vehicle);

  return (
    <div className="mx-auto w-full max-w-7xl p-5 space-y-4">
      {/* Título do veículo */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {vehicleWithTotalPrice.name} {vehicleWithTotalPrice.model}
      </h1>

      {/* Galeria de imagens */}
      {vehicle.images.length > 0 && (
        <VehicleImages
          cover={vehicle.cover!}
          images={vehicle.images}
        />
      )}

      {/* Detalhes do veículo */}
      <div className="my-8 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Detalhes do Veículo
        </h2>

        {/* Grid de informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Versão */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">Versão</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicleWithTotalPrice.version}
            </p>
          </div>

          {/* Ano */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">Ano</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicleWithTotalPrice.year}
            </p>
          </div>

          {/* Quilometragem */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">
              Quilometragem
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicleWithTotalPrice.km} km
            </p>
          </div>

          {/* Preço */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">Preço</p>
            <p
              className={`text-gray-900 dark:text-white ${
                vehicleWithTotalPrice.discountPercentage! > 0
                  ? "text-xs font-light line-through"
                  : "text-lg font-medium"
              }`}
            >
              {Number(vehicleWithTotalPrice.basePrice).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            {vehicleWithTotalPrice.discountPercentage! > 0 && (
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {Number(vehicleWithTotalPrice.totalPrice).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </p>
            )}
          </div>

          {/* Desconto (se aplicável) */}
          {vehicleWithTotalPrice.discountPercentage! > 0 && (
            <div className="space-y-1">
              <p className="text-base text-gray-500 dark:text-gray-400">
                Desconto
              </p>
              <p className="text-lg font-medium text-green-600 dark:text-green-400">
                {vehicleWithTotalPrice.discountPercentage}%
              </p>
            </div>
          )}

          {/* Combustível */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">
              Combustível
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicleWithTotalPrice.gas}
            </p>
          </div>

          {/* Transmissão */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">
              Transmissão
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicleWithTotalPrice.transmission}
            </p>
          </div>

          {/* Blindado */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">
              Blindado
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicleWithTotalPrice.armored}
            </p>
          </div>

          {/* Final da Placa (se aplicável) */}
          {vehicleWithTotalPrice.plateEnd && (
            <div className="space-y-1">
              <p className="text-base text-gray-500 dark:text-gray-400">
                Final da Placa
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {vehicleWithTotalPrice.plateEnd}
              </p>
            </div>
          )}

          {/* WhatsApp do Vendedor (se aplicável) */}
          {vehicleWithTotalPrice.whatsApp && (
            <div className="space-y-1">
              <p className="text-base text-gray-500 dark:text-gray-400">
                WhatsApp do Vendedor
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {formatPhoneNumber(vehicleWithTotalPrice.whatsApp)}
              </p>
            </div>
          )}

          {/* Categoria */}
          <div className="space-y-1">
            <p className="text-base text-gray-500 dark:text-gray-400">
              Categoria
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicle.category?.name}
            </p>
          </div>
        </div>

        {/* Descrição (se aplicável) */}
        {vehicleWithTotalPrice.description && (
          <div className="mt-6">
            <p className="text-base text-gray-500 dark:text-gray-400">
              Descrição
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-100 p-2">
              {vehicleWithTotalPrice.description}
            </p>
          </div>
        )}
      </div>

      {/* Botão de contato */}
      <div className="my-8 text-center">
        <Link
          href={EncodeWhatsAppMessage(vehicle.whatsApp!, vehicle.name, vehicle.model, vehicle.version, vehicle.plateEnd, vehicle.km)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-2 items-center justify-center rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white hover:bg-green-600 transition-colors"
        >
          Contatar Vendedor via WhatsApp <FaWhatsapp size={20} />
        </Link>
      </div>
    </div>
  );
};

export default VehiclePage;