import NewVehicleForm from "@/components/admin/new-vehicle-form";
import BackButton from "@/components/common/back-button";

import Image from "next/image";


const Search = async () => {
  

  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="relative">
          <Image
            src="/02.png"
            alt="CarShop Banner - Cadastro de veículos"
            width={0}
            height={0}
            className="h-auto w-full object-cover"
            sizes="100vw"
            priority
            draggable="false"
          />
          <BackButton />
        </div>

        <div className="mx-auto w-full max-w-7xl p-5">
          <div className="mx-auto mb-5 flex w-full flex-col justify-center space-y-2">
            <h1 className="flex justify-center text-2xl font-bold">
              Adicionar Veículo
            </h1>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Cadastre novos veículos para incrementar seu catálogo.
            </p>
          </div>
          <NewVehicleForm />
        </div>
      </div>
    </section>
  );
};

export default Search;
