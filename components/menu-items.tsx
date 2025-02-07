import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prismaClient } from "@/lib/prisma";
import VehiclesSection from "@/sections/vehicles-section";




const MenuItems = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="my-8 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center px-5">
        <span className="font-light text-primary">CATÁLOGO</span>
        <h2 className="text-center text-2xl font-black uppercase italic">
          Explore nossa seleção de veículos disponíveis
        </h2>

        <p className="text-center text-sm font-light dark:text-white/70">
          Desde picapes até sedans, temos algo para
          satisfazer todos os tipos de condutores
        </p>

          {/* <Button variant={"default"} asChild className="rounded-xl mt-5 w-full max-w-md mx-auto">
            <Link href={URL} target="_blank" className="flex items-center gap-2">
              Faça seu pedido <FaWhatsapp size={20} />
            </Link>
          </Button> */}
      </div>

      <Tabs
        defaultValue="Todos"
        className="flex w-full flex-col items-center justify-center"
      >
        <TabsList className="px-2 rounded-none xs:rounded-md">
        <TabsTrigger  value={'Todos'}>
              {'Todos'}
            </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.name}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent 
          value="Todos"
          className="w-full"
        >
          <VehiclesSection categoryName="Todos" />
        </TabsContent>
        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.name}
            className="w-full"
          >
            <VehiclesSection categoryName={category.name} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuItems;
