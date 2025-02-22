"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Search from "./search";

const Header = () => {
  return (
    <header>
      <Card className="rounded-none border-none drop-shadow-xl px-5 w-full mx-auto">
        <CardContent className="mx-auto flex w-full max-w-6xl items-center justify-around p-3">
          <Link href="/">
            <Image
              src="/AutoPrimeLogo.png"
              alt="AutoPrime"
              height={0}
              width={0}
              sizes="100vw"
              priority
              className="h-auto w-24 object-contain"
            />
          </Link>

          <div className="mx-auto hidden w-full max-w-lg md:block">
            <Search />
          </div>

          <MobileMenu />
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
