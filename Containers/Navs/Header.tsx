"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import SensediaLogo from "@/public/sensedia.svg";
import Sensedia from "@/public/sensedia-logo.svg";
import ArrowR from "@/public/arrow-r.svg";
import QuestionIcon from "@/public/question.svg";
import MenuIcon from "@/public/menuIco.svg";
import Separator from "@/public/separator.svg";
import Avatar from "@/public/Avatar.svg";
import Type from "@/public/type.svg";
import Trophy from "@/public/trophy.svg";
import Lvl from "@/public/level.svg";

const Header = () => {
  const path = usePathname();
  console.log(path);
  return (
    <header className="">
      <section className="bg-sensGray p-4 h-[87px]">
        <div className="w-full flex items-center">
          <div className="flex flex-col text-sm">
            <Image src={SensediaLogo} alt="sensedia" className="mb-[-10px]" />
            <p className="text-white text-xs pl-[45px]">Entrenador de Fútbol</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 h-[66px]">
        <div className="bg-redd-200 w-full h-full flex items-center justify-between">
          <div className="text-sm flex items-center justify-start h-full gap-[0.8rem]">
            <Link href="/">
              <Image src={Sensedia} alt="sensedia" className="mb-[-10px]" />
            </Link>
            <p className="text-sensPurple p-0 pt-[10px]">BIENVENIDO</p>
            <Image src={ArrowR} alt="arrow" className="pt-[10px]" />
            <p className="text-gray-500 p-0 pt-[10px]">
              {path === "user"
                ? "Lista de Usuarios"
                : path === "/user/new"
                ? "Nuevo Usuario"
                : path?.includes("/user")
                ? "Detalle de Usuario"
                : "Registro"}
            </p>
          </div>
          <div className="flex items-center justify-start h-full gap-[0.8rem]">
            <Image src={QuestionIcon} alt="help" className="cursor-pointer" />
            <Image src={MenuIcon} alt="toolBox" className="cursor-pointer" />
            <Image src={Separator} alt="separator" />
            <Image src={Avatar} alt="avatar image" />
            <p className="text-gray-500 p-0">Nombre de usuario</p>
          </div>
        </div>
      </section>

      <section className="bg-sensPurple px-[18%] h-[100px]">
        <div className="text-white w-full h-full flex items-center gap-[2.5rem]">
          <div className="flex items-center h-full gap-2">
            <Image src={Type} alt="type" />
            <div className="flex flex-col h-full justify-evenly">
              <p>Tipo de cancha</p>
              <p className="text-sm font-light">Sociedad</p>
            </div>
          </div>
          <div className="flex items-center h-full gap-2">
            <Image src={Lvl} alt="type" />
            <div className="flex flex-col h-full justify-evenly">
              <p>Nivel</p>
              <p className="text-sm font-light">Profesional</p>
            </div>
          </div>
          <div className="flex items-center h-full gap-2">
            <Image src={Trophy} alt="type" />
            <div className="flex flex-col h-full justify-evenly">
              <p>Victorias</p>
              <p className="text-sm font-light">345</p>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
