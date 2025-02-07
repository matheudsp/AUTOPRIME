"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";
import { Button } from "./ui/button";
import { FaPause, FaPlay } from "react-icons/fa6";

interface Image {
  id: string;
  url: string;
  vehicleId: string;
}

interface VehicleImagesProps {
  cover?: string;
  images: Image[];
}

const VehicleImages = ({ images, cover }: VehicleImagesProps) => {
  const allImages = cover
    ? [{ id: "cover", url: cover, vehicleId: "cover" }, ...images] // Adiciona a capa como primeira imagem
    : images; // Usa apenas as imagens se não houver capa

  return (
    <div className="w-full max-w-[90vw] mx-auto">
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          rewind: true,
          pauseOnHover: true,
          resetProgress: false,
          gap: "1rem",
          pagination: true, 
        }}
        hasTrack={false}
        aria-label="Imagens do veículo"
      >
        <div className="relative">
          <SplideTrack>
            {allImages.map((image, i) => (
              <SplideSlide key={i}>
                <div className="flex items-center justify-center">
                  <Image
                    width={384}
                    height={384}
                    alt={`Foto do veículo ${i + 1}`}
                    src={image.url}
                    className="w-full h-[45vh] md:h-[50vh] lg:h-[55vh] object-cover rounded-lg"
                    priority={i === 0}
                  />
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>

        {/* Barra de progresso */}
        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>

        {/* Botão de play/pause personalizado */}
        <div className="splide__controls absolute bottom-4 right-4 z-10">
          <Button
            className="splide__toggle rounded-full w-11 h-11 p-0 flex items-center justify-center bg-black/50 dark:bg-white/50 dark:hover:bg-white/70 hover:bg-black/70 transition-colors"
          >
            <span className="splide__toggle__play">
              <FaPlay size={18} className="text-white" />
            </span>
            <span className="splide__toggle__pause">
              <FaPause size={18} className="text-white" />
            </span>
          </Button>
        </div>
      </Splide>
    </div>
  );
};

export default VehicleImages;