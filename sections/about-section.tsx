import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";


const AboutSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 px-5 my-5">
      {/* <div className="flex flex-col items-center justify-center gap-2 p-5">
        <h1 className="text-center text-xl font-black uppercase italic md:text-3xl">
          Encontre o carro dos seus sonhos, novo ou usado
        </h1>
        <p className="text-sm font-light dark:text-white/70 md:text-base">
          Qualidade, variedade e oportunidades exclusivas para você
        </p>
      </div>

      <Carousel className="mx-auto w-full max-w-7xl">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              key={product.href}
            >
              <Image
                src={product.href}
                alt="AutoPrime"
                width={0}
                height={0}
                className="h-60 w-full select-none rounded-2xl object-cover"
                sizes="100vw"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block">
          <CarouselNext />
          <CarouselPrevious />
        </div>
      </Carousel>
*/}
      <Separator className="my-5" />

      <div className="flex flex-col-reverse items-center justify-between gap-5 md:flex-row">
        <Image
          src="/Banner2.jpeg"
          alt="Sobre a AutoPrime"
          width={0}
          height={0}
          className="h-auto w-full max-w-xl object-cover rounded-xl"
          sizes="100vw"
          priority
          draggable="false"
        />

        <div className="flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
          <span className="font-light text-primary">SOBRE</span>
          <h2 className="text-2xl font-bold">O que é a AutoPrime?</h2>

          <div className="mt-5 flex flex-col gap-3">
            <p className="text-sm font-light dark:text-white/70">
              Bem-vindo à AutoPrime, onde veículos novos e seminovos se encontram para oferecer a você as melhores opções do mercado.
            </p>

            <p className="text-sm font-light dark:text-white/70">
              Nossa missão é conectar você ao carro ideal, com qualidade, procedência garantida e condições exclusivas.
            </p>

            <p className="text-sm font-bold">
              Descubra a emoção de dirigir o carro que sempre quis e faça parte dessa experiência única.
            </p>
          </div>
        </div>
      </div>

      {/* <Separator className="my-5" /> */}
    </section>
  );
};

export default AboutSection;
