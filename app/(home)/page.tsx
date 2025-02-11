import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import VehiclesSection from "@/sections/vehicles-section";
import AboutSection from "@/sections/about-section";
import WelcomeSection from "@/sections/welcome-section";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type tHomeParams = Promise<{ page?: string }>

export default function  Home({ params }: {params: tHomeParams }  ) {

  return (
    <section>
      <div className="relative w-full 3xl:max-w-7xl mx-auto">
        <Image
          src="/Banner03.png"
          alt="Banner"
          width={0}
          height={0}
          className="mx-auto h-auto w-full object-cover 3xl:max-w-7xl 3xl:rounded-b-xl"
          sizes="100vw"
          priority
          draggable="false"
        />

        <div className="absolute bottom-3 right-3 hidden md:block">
          <div className="flex flex-col items-center justify-center gap-2">
            <Button size={"icon"} variant={"outline"} asChild>
              <Link href={"#"}>
                <FaInstagram size={28} />
              </Link>
            </Button>

            <Button size={"icon"} variant={"outline"} asChild>
              <Link href={"#"}>
                <FaWhatsapp size={28} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <WelcomeSection />
        <VehiclesSection searchParams={params} />
        <AboutSection />
      </div>
    </section>
  );
}
