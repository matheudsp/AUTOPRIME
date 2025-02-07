"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaChevronRight,
  FaSitemap,
  FaWhatsapp,
} from "react-icons/fa6";
import Link from "next/link";
import { Button } from "../ui/button";

type ButtonSize = "sm" | "md" | "lg" | undefined;

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  size: ButtonSize;
}

function SocialLink({ href, icon, size }: SocialLinkProps) {
  return (
    <Link href={href} target="_blank">
      <Button variant={"ghost"} size={"icon"}>
        {icon}
      </Button>
    </Link>
  );
}

interface FooterLinkProps {
  text: string;
}

function FooterLink({ text }: FooterLinkProps) {
  return (
    <p className="group flex cursor-pointer items-center justify-center gap-1">
      <span
        className="hidden group-hover:block group-hover:animate-spin"
        style={{ animationIterationCount: 1, animationDuration: "0.3s" }}
      >
        <FaChevronRight size={12} className="text-primary" />
      </span>
      {text}
    </p>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const helps = [
    "Central de ajuda",
    "Como fazer um pedido",
    "Perguntas Frequentes",
  ];

  return (
    <div>
      <div className="hidden md:block">
        <footer className=" mx-auto w-full cursor-default items-center justify-center border-t border-neutral-900 bg-white pt-5 shadow-xl dark:border-primary dark:bg-[#181717] md:px-0 3xl:max-w-7xl">
          <section className="flex items-center justify-around gap-y-4 pb-5 shadow-xl">
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

            <p className="text-center text-sm">
              &copy; {currentYear} AutoPrime - Todos os direitos reservados.
            </p>

            <div className="flex gap-1">
              <SocialLink
                href="https://www.instagram.com/"
                icon={<FaInstagram size={28} />}
                size="sm"
              />
              <SocialLink
                href=""
                icon={<FaWhatsapp size={28} />}
                size="sm"
              />
            </div>
          </section>

          <div className="bg-zinc-200/60 px-4 py-6 dark:bg-[#111111]">
            <section className="mx-auto flex flex-col items-center justify-center gap-2 pt-2 text-center text-xs">
              <h3 className="text-base font-medium uppercase">Funcionamento</h3>
              <p>
                Horário de funcionamento: 18:00 às 03:00 - Terça-Feira a
                Domingo, Segunda-Feira - Fechado.
              </p>

              <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-medium uppercase">Whatsapp - </h3>
                  <p>(12) 9999-9999</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-medium uppercase">E-mail - </h3>
                  <p>contato@AutoPrime.com</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-medium uppercase">Admin - </h3>
                  <a
                    target="_self"
                    href="http://localhost:3000/admin"
                    className="underline"
                  >
                    Acessar como administrador
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>

      <div className="md:hidden">
        <footer className="mx-auto w-full cursor-default items-center justify-center border-t border-neutral-900 bg-white pt-5 shadow-xl dark:border-primary dark:bg-[#181717] md:px-0">
          <section className="flex flex-col items-center justify-around gap-y-4 pb-5 shadow-xl md:flex-row">
            <Link href="/">
              <Image
                src="/AutoPrimeLogo.png"
                alt="AutoPrime"
                height={0}
                width={0}
                sizes="100vw"
                priority
                className="h-auto w-36 object-contain"
              />
            </Link>

            <p className="text-center text-sm">
              &copy; {currentYear} AutoPrime - Todos os direitos reservados.
            </p>

            <div className="flex gap-1">
              <SocialLink
                href="https://www.instagram.com/"
                icon={<FaInstagram size={28} />}
                size="sm"
              />
              <SocialLink
                href=""
                icon={<FaWhatsapp size={28} />}
                size="sm"
              />
            </div>
          </section>

          <div className="bg-zinc-200/60 px-4 py-6 dark:bg-[#111111]">
            <section className="mx-auto flex flex-col items-center justify-center gap-2 pt-2 text-center text-xs">
              <h3 className="text-base font-medium uppercase">Funcionamento</h3>
              <p>
                Horário de funcionamento: 18:00 às 03:00 - Terça-Feira a
                Domingo, Segunda-Feira - Fechado.
              </p>

              <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-medium uppercase">Whatsapp - </h3>
                  <p>(12) 9999-9999</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-medium uppercase">E-mail - </h3>
                  <p>contato@AutoPrime.com</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-medium uppercase">Admin - </h3>
                  <a
                    target="_self"
                    href="http://localhost:3000/sign-in"
                    className="underline"
                  >
                    Acessar como administrador
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}
