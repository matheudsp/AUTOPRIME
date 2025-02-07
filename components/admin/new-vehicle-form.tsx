"use client";
import { GiCarKey } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState, type ChangeEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Tags, tagTranslation } from "@/helpers/tag-translation";
import { newVehicleSchema } from "@/schemas/vehicle.schemas";
import { createVehicle } from "@/actions/new-vehicle";
import type { Category } from "@prisma/client";
import { categories } from "@/actions/categories";

const fuels = ["Gasolina", "Álcool", "Flex", "Diesel", "GNV", "Elétrico"];
const transmissions = ["Automático", " Manual", "Semi-Automático"];

function ImagePreview({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative h-32 w-32 rounded-[20px]">
      <Image
        src={src}
        alt="Preview"
        width={0}
        height={0}
        className="h-full w-full  rounded-[20px] object-cover"
      />
      <Button
        variant="destructive"
        onClick={onRemove}
        className="absolute right-1 top-1 h-6 w-6 rounded-[20px] p-0 text-xs font-bold text-white"
      >
        X
      </Button>
    </div>
  );
}

const NewVehicleForm = () => {
  const [categorySelected, setCategorySelected] = useState<number | string>("");
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [tagSelected, setTagSelected] = useState<string>("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await categories();
        setCategoriesList(categoriasData);
      } catch (error) {
        console.error("Erro ao obter categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  function handleChangeTag(value: string) {
    setTagSelected(value);
  }

  function handleChangeCategory(value: string) {
    setCategorySelected(value);
  }

  const form = useForm<z.infer<typeof newVehicleSchema>>({
    resolver: zodResolver(newVehicleSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Limita o número de imagens para 5
    if (imagePreviews.length + files.length > 5) {
      toast.error("Você só pode enviar até 5 imagens.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCoverFile(file);
    } else {
      setCoverPreview("");
    }
  };
  const uploadToBucket = async () => {
    const imagesUrl: string[] = [];
    let coverUrl: string | null = null;

    // Upload da capa
    if (coverFile) {
      const sanitizedCoverName = coverFile.name
        .replace(/\s+/g, "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "");

      const coverFileName = `${Date.now()}-cover-${sanitizedCoverName}`;

      const { data: coverData, error: coverError } = await supabase.storage
        .from("vehicles")
        .upload(coverFileName, coverFile);

      if (coverError) {
        throw toast.error(`Erro ao enviar capa: ${coverError.message}`);
      }

      if (coverData) {
        const { data: coverPublicUrl } = supabase.storage
          .from("vehicles")
          .getPublicUrl(coverFileName);

        coverUrl = coverPublicUrl?.publicUrl || null;
      }
    }

    // Upload das imagens adicionais
    for (const file of imageFiles) {
      const sanitizedFileName = file.name
        .replace(/\s+/g, "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "");

      const fileName = `${Date.now()}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from("vehicles")
        .upload(fileName, file);

      if (error) {
        throw toast.error(error.message);
      }

      if (data) {
        const { data: publicUrlData } = supabase.storage
          .from("vehicles")
          .getPublicUrl(fileName);

        if (publicUrlData.publicUrl) {
          imagesUrl.push(publicUrlData.publicUrl);
        }
      }
    }

    return { imagesUrl, coverUrl };
  };

  const handleSubmit = async (data: z.infer<typeof newVehicleSchema>) => {
    try {
      const Urls = await uploadToBucket();

      const vehicleData = {
        ...data,
        basePrice: parseFloat(data.basePrice.replace(",", ".")),
        discountPercentage: parseFloat(
          data.discountPercentage!.replace(",", "."),
        ),
        specialTag: data.specialTag as Tags,
        cover: Urls.coverUrl || undefined,
        images: Urls.imagesUrl,
      };

      await createVehicle({ data: vehicleData });

      form.reset();
      setImagePreviews([]);
      setImageFiles([]);

      toast.success("Veículo criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar veículo! " + error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormItem>
            <FormLabel>Capa</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex h-36 w-full items-center justify-center rounded-md border">
                  {coverPreview ? (
                    <Image
                      src={coverPreview}
                      alt="Preview"
                      width={0}
                      height={0}
                      className="h-full w-full rounded-lg object-contain"
                      unoptimized // Adicione isso se não quiser otimizações do Next.js
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span className="text-xs text-gray-500 md:text-base">
                        Selecione 1 imagem para ser mostrada na capa.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <FormDescription>
              A imagem selecionada será exibida como capa do veículo.
            </FormDescription>
          </FormItem>

          <div className="flex flex-col items-center gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Fiat"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Pulse"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Versão</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 1.6 CVT"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 2023 ou 2023/2024"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="km"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Kilometragem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 10000"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categoria</FormLabel>
                  {categoriesList.length > 0 ? (
                    <FormControl>
                      <select
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        {...field}
                        onChange={(e) => {
                          handleChangeCategory(e.target.value);
                          field.onChange(e);
                        }}
                      >
                        <option
                          value="default"
                          className="hidden text-muted-foreground"
                        >
                          Selecione a categoria do veículo...
                        </option>
                        {categoriesList.map((category) => (
                          <option
                            className="text-black dark:text-white"
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Carregando categorias...
                      </p>
                    </div>
                  )}
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 78.000,40"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Desconto (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 20" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="gas"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Combustível</FormLabel>

                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <option
                        value="default"
                        className="hidden text-muted-foreground"
                      >
                        Selecione o combustível do veículo...
                      </option>
                      {Object.values(fuels).map((fuel, i) => (
                        <option
                          className="text-black dark:text-white"
                          key={i}
                          value={fuel}
                        >
                          {fuel}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Câmbio</FormLabel>

                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <option
                        value="default"
                        className="hidden text-muted-foreground"
                      >
                        Selecione a transmissão do veículo...
                      </option>
                      {Object.values(transmissions).map((transmission, i) => (
                        <option
                          className="text-black dark:text-white"
                          key={i}
                          value={transmission}
                        >
                          {transmission}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plateEnd"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Final da Placa</FormLabel>

                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <option
                        value="default"
                        className="hidden text-muted-foreground"
                      >
                        Selecione uma opção
                      </option>
                      <option value="Não possui">Sem placa</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="armored"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Possui blindagem?</FormLabel>

                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <option
                        value="default"
                        className="hidden text-muted-foreground"
                      >
                        Selecione uma opção
                      </option>

                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Informe se o veículo possui &apos;blindagem&apos;.{" "}
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialTag"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Classificação</FormLabel>

                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...field}
                      onChange={(e) => {
                        handleChangeTag(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      <option
                        value="default"
                        className="hidden text-muted-foreground"
                      >
                        Selecione a classificação do veículo
                      </option>
                      {Object.values(Tags).map((tag) => (
                        <option
                          className="text-black dark:text-white"
                          key={tag}
                          value={tag}
                        >
                          {tagTranslation(tag)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Selecione a opção &apos;Vazio&apos; caso não queira nenhuma
                    classificação adicional.{" "}
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsApp"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>WhatsApp do Vendedor</FormLabel>
                  <FormControl>
                    <Input
                      onKeyDown={(e) => {
                        const allowedKeys = /[0-9]/;
                        if (!allowedKeys.test(e.key) && e.key !== "Backspace") {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Ex: 89 9 94180453"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Informe o número do &apos;WhatsApp&apos; do Vendedor. Deixe
                    em branco, caso queira o número padrão .{" "}
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormItem>
            <FormLabel>Fotos do veículo</FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </FormControl>
            <FormDescription>Envie até 5 imagens do veículo.</FormDescription>
            <div className="mt-4 flex flex-wrap gap-4">
              {imagePreviews.map((preview, index) => (
                <ImagePreview
                  key={index}
                  src={preview}
                  onRemove={() => handleRemoveImage(index)}
                />
              ))}
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Itens do veículo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Farol de neblina, Direção elétrica, CarPlay, Alarme, Chave Canivete"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            variant={"default"}
            type="submit"
            className="w-full rounded-xl"
          >
            Criar Veículo <GiCarKey size={24} color="#FFF" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewVehicleForm;
