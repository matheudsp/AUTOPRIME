

import { prismaClient } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPhoneNumber } from "@/lib/utils";


interface VehiclePageProps {
  params: {
    slug: string;
  };
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

  return (
    <div className="mx-auto w-full max-w-7xl p-5">
      {/* Título do veículo */}
      <h1 className="text-3xl font-bold">
        {vehicle.name} {vehicle.model}
      </h1>

      {/* Imagem de capa */}
      {vehicle.cover && (
        <div className="my-5">
          <Image
            src={vehicle.cover}
            alt={`Capa do veículo ${vehicle.name}`}
            width={800}
            height={400}
            className="h-auto w-full rounded-lg object-cover"
            priority
          />
        </div>
      )}

      {/* Galeria de imagens */}
      {vehicle.images.length > 0 && (
         <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y]}
         spaceBetween={50}
         slidesPerView={3}
         navigation
         pagination={{ clickable: true }}
         scrollbar={{ draggable: true }}
         onSwiper={(swiper) => console.log(swiper)}
         onSlideChange={() => console.log('slide change')}
       >
         {vehicle?.images.map((image) => (
           <SwiperSlide key={image.id}>
             <Image width={0} height={0} alt={'Imagens do veículo'} src={image.url} className="w-full h-96 object-cover" />
           </SwiperSlide>
         ))}
       </Swiper>
      )}

      {/* Detalhes do veículo */}
      <div className="my-5 space-y-4">
        <p className="text-lg">
          <strong>Versão:</strong> {vehicle.version}
        </p>
        <p className="text-lg">
          <strong>Ano:</strong> {vehicle.year}
        </p>
        <p className="text-lg">
          <strong>Quilometragem:</strong> {vehicle.km} km
        </p>
        <p className="text-lg">
          <strong>Preço:</strong> R${" "}
          {vehicle.basePrice.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        {vehicle.discountPercentage! > 0 && (
          <p className="text-lg">
            <strong>Desconto:</strong> {vehicle.discountPercentage}%
          </p>
        )}
        <p className="text-lg">
          <strong>Combustível:</strong> {vehicle.gas}
        </p>
        <p className="text-lg">
          <strong>Transmissão:</strong> {vehicle.transmission}
        </p>
        <p className="text-lg">
          <strong>Blindado:</strong> {vehicle.armored}
        </p>
        {vehicle.plateEnd && (
          <p className="text-lg">
            <strong>Final da Placa:</strong> {vehicle.plateEnd}
          </p>
        )}
        {vehicle.whatsApp && (
          <p className="text-lg">
            <strong>WhatsApp do Vendedor:</strong> {formatPhoneNumber(vehicle.whatsApp)}
          </p>
        )}
        <p className="text-lg">
          <strong>Categoria:</strong> {vehicle.category?.name}
        </p>
        {vehicle.description && (
          <p className="text-lg">
            <strong>Descrição:</strong> {vehicle.description}
          </p>
        )}
      </div>

      {/* Botão de contato */}
      <div className="my-5">
        <a
          href={`https://wa.me/${vehicle.whatsApp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600"
        >
          Contatar Vendedor via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default VehiclePage;
