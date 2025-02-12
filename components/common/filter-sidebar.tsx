"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { sortYearsDescending } from "@/lib/utils";

interface FilterContentProps {
  categories: { id: string; name: string }[];
  years: { year: string }[];
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  minPrice: string;
  setMinPrice: Dispatch<SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  transmission: string;
  setTransmission: Dispatch<SetStateAction<string>>;
  armored: boolean;
  setArmored: Dispatch<SetStateAction<boolean>>;
}

interface FilterDrawerProps {
  vehicleCategories: { id: string; name: string }[];
  vehicleYears: { year: string }[];
}

const FilterDrawer = ({
  vehicleCategories,
  vehicleYears,
}: FilterDrawerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados para cada filtro
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [transmission, setTransmission] = useState(
    searchParams.get("transmission") || "all"
  );
  const [armored, setArmored] = useState(
    searchParams.get("armored") === "true"
  );

  // Atualiza os filtros na URL automaticamente
  useEffect(() => {
    const params = new URLSearchParams();

    if (category && category !== "all") params.set("category", category);
    if (year) params.set("year", year);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (transmission && transmission !== "all")
      params.set("transmission", transmission);
    if (armored) params.set("armored", String(armored));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [category, year, minPrice, maxPrice, transmission, armored, router]);

  // Função para limpar os filtros
  const clearFilters = () => {
    setCategory("all");
    setYear("");
    setMinPrice("");
    setMaxPrice("");
    setTransmission("all");
    setArmored(false);
  };

  return (
    <>
      {/* Mobile: Botão para abrir filtros */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="flex items-center gap-2 ml-auto">
            Filtrar <IoFilterOutline size={20} />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Filtrar por:</DrawerTitle>
            <DrawerDescription>
              Busque veículos com itens específicos.
            </DrawerDescription>
          </DrawerHeader>
          <FilterContent
            categories={vehicleCategories}
            years={sortYearsDescending(vehicleYears)}
            category={category}
            setCategory={setCategory}
            year={year}
            setYear={setYear}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            transmission={transmission}
            setTransmission={setTransmission}
            armored={armored}
            setArmored={setArmored}
          />

          <DrawerFooter>
            <DrawerClose asChild>
              <div className="space-y-2">
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => {
                  clearFilters();
                }}
              >
                Limpar Busca
              </Button>
              <Button
                className="w-full"
                variant="default"
                
              >
                Fechar
              </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const FilterContent: React.FC<FilterContentProps> = ({
  categories,
  years,
  category,
  setCategory,
  year,
  setYear,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  transmission,
  setTransmission,
  armored,
  setArmored,
}) => {
  return (
    <div>
      {/* Categoria */}
      <div className="mb-4">
        <label className="font-medium">Categoria:</label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ano */}
      <div className="mb-4">
        <label className="font-medium">Ano:</label>
        <Select onValueChange={setYear} value={year}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecione o ano do veículo" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year, i) => (
              <SelectItem key={i} value={year.year}>
                {year.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Faixa de Preço */}
      <div className="mb-4">
        <label className="font-medium">Preço:</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Mínimo"
            className="w-1/2 mt-1"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Máximo"
            className="w-1/2 mt-1"
          />
        </div>
      </div>

      {/* Transmissão */}
      <div className="mb-4">
        <label className="font-medium">Transmissão:</label>
        <Select onValueChange={setTransmission} value={transmission}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Automático">Automático</SelectItem>
            <SelectItem value="Semi-Automático">Semi-Automático</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blindado */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="armored"
          checked={armored}
          onChange={(e) => setArmored(e.target.checked)}
          className="w-5 h-5 border-gray-400 rounded cursor-pointer"
        />
        <label htmlFor="armored" className="cursor-pointer select-none">
          Blindado
        </label>
      </div>
    </div>
  );
};

export default FilterDrawer;
