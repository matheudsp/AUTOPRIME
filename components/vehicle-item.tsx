"use client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import Image from "next/image";

import { VehicleWithTotalPrice } from "@/helpers/vehicle";
import { Tags, tagTranslation } from "@/helpers/tag-translation";
import VehicleDialog from "./vehicle-dialog";
import Link from "next/link";

interface VehicleItemProps {
  vehicle: VehicleWithTotalPrice;
  isAdminPage: boolean;
}

const VehicleItem = ({ isAdminPage, vehicle }: VehicleItemProps) => {
  return (
    <>
      <Card className="w-full select-none rounded-2xl border-none bg-white dark:bg-neutral-800">
        <CardContent className="px-0">
          <div className="p-5">
            <div className="relative">
              <Image
                src={vehicle.cover!}
                alt={vehicle.name}
                sizes="100vw"
                height={0}
                width={0}
                className="h-56 w-full rounded-2xl object-cover"
                draggable={false}
              />

              {vehicle.discountPercentage! > 0 && (
                <p className="absolute left-0 top-0 rounded-br-2xl rounded-tl-2xl bg-primary px-4 py-1 text-xs font-light text-white">
                  Promoção -{" "}
                  <span className="font-bold">
                    {vehicle.discountPercentage}% OFF
                  </span>
                </p>
              )}

              {vehicle.specialTag !== "EMPTY" && (
                <p className="absolute bottom-0 right-0 rounded-br-2xl rounded-tl-2xl bg-primary px-4 py-1 text-center text-xs font-medium text-white">
                  {tagTranslation(vehicle.specialTag as Tags)}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-3 px-5 pb-5 text-black dark:text-white">
            {/* Nome e Detalhes Principais */}
            <h2 className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-center font-medium lg:text-lg">
              {vehicle.name} {vehicle.model} {vehicle.version}
            </h2>
            {/* Preços com destaque e descontos */}
            <div className="flex items-center gap-2">
              <p
                className={` ${vehicle.discountPercentage! > 0 ? "text-xs font-light line-through" : "font-bold"}`}
              >
                {Number(vehicle.basePrice).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              {vehicle.discountPercentage! > 0 && (
                <p
                  className={`${vehicle.discountPercentage! > 0 && "font-bold"}`}
                >
                  {Number(vehicle.totalPrice).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              )}
            </div>

            {/* Informações adicionais com rótulos */}

            <div className="grid w-full gap-3 text-sm font-light text-muted-foreground dark:text-white/70">
              <div className="grid grid-cols-2 items-center rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
                <span className="rounded-full bg-primary px-3 py-1 text-center  text-xs font-semibold text-white">
                  Ano
                </span>
                <span className="text-center text-sm font-medium">
                  {vehicle.year}
                </span>
              </div>
              <div className="grid grid-cols-2 items-center rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
                <span className="rounded-full bg-primary px-3 py-1 text-center  text-xs font-semibold text-white">
                  Km
                </span>
                <span className="text-center text-sm font-medium">
                  {vehicle.km} km
                </span>
              </div>

              <div className="grid grid-cols-2 items-center rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
                <span className="rounded-full bg-primary px-3 py-1 text-center  text-xs font-semibold text-white">
                  Transmissão
                </span>
                <span className="text-center text-sm font-medium">
                  {vehicle.transmission}
                </span>
              </div>
            </div>
          </div>
          {isAdminPage ? (
            <VehicleDialog vehicle={vehicle} isAdminPage={isAdminPage} />
          ) : (
            <Link
              className="flex justify-center"
              href={`vehicles/${vehicle.slug}`}
            >
              <Button variant="default" className="w-[90%] rounded-xl">
                Ver detalhes
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default VehicleItem;
