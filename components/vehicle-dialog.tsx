import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { ClipLoader } from "react-spinners";
import { TbTrash } from "react-icons/tb";
import UpdateProductForm from "./admin/update-product-form";
import { useState } from "react";
import { deleteVehicle } from "@/actions/delete-vehicle";
import toast from "react-hot-toast";
import type { VehicleWithTotalPrice } from "@/helpers/vehicle";
import { tagTranslation, type Tags } from "@/helpers/tag-translation";

interface iDialogProps {
  vehicle: VehicleWithTotalPrice;
  isAdminPage: boolean;
}
const VehicleDialog = ({isAdminPage,vehicle}: iDialogProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [cancelIsLoading, setCancelIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    try {
      setCancelIsLoading(true);
      await deleteVehicle(vehicle.id);
      setDialogIsOpen(false);
      toast.success("Veículo removido com sucesso!");
    } catch (error) {
      return toast.error("Ocorreu um erro!");
    } finally {
      setCancelIsLoading(false);
    }
  };
  return (
    <div className="px-5">
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full rounded-xl">
            Ver detalhes
          </Button>
        </DialogTrigger>
        <DialogContent className="border-none">
          <DialogHeader>
            <DialogTitle className="text-xl">{vehicle.name}</DialogTitle>
            <DialogDescription>
              <Separator className="mb-5 mt-3" />

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

              <div className="flex items-center justify-center gap-2 text-lg text-black dark:text-white">
                <p
                  className={`my-3 ${vehicle.discountPercentage! > 0 ? "font-light line-through" : "font-bold"}`}
                >
                  {Number(vehicle.basePrice).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                {vehicle.discountPercentage! > 0 && (
                  <p
                    className={`my-3 ${vehicle.discountPercentage! > 0 && "font-bold"}`}
                  >
                    {Number(vehicle.totalPrice).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}
              </div>

              <p className="text-center text-base font-light text-black dark:text-white">
                {vehicle.description}
              </p>

              {isAdminPage && (
                <div className="mt-5 flex flex-col items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" className="w-full">
                        Atualizar informações do veículo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-none">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Atualizar informações do veículo
                        </DialogTitle>
                        <DialogDescription>
                          <Separator className="mb-5 mt-3" />

                          <UpdateProductForm
                            vehicle={vehicle}
                            vehicleId={vehicle.id}
                          />
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter></DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                      <Button
                        className="flex w-full items-center gap-2"
                        variant={"outline"}
                      >
                        Remover veículo do catálogo <TbTrash size={25} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Você tem certeza disso?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser revertida e este veículo será
                          excluido permanentemente do catálogo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteClick}
                          disabled={cancelIsLoading}
                        >
                          {cancelIsLoading ? (
                            <span className="flex items-center gap-4">
                              <ClipLoader color="#fff" size={20} /> Removendo...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Remover
                              <TbTrash size={25} />
                            </span>
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleDialog;
