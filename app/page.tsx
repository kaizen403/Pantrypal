import SparklesCore from "@/components/ani_ui/Particles";
import React from "react";
import { Bad_Script, Lexend, Lexend_Tera } from "next/font/google";
import { Button } from "@/components/ani_ui/Movingborder";
import Link from "next/link";
import Image from "next/image";
import Track from "@/components/Track";
const badscript = Bad_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});
const lexend = Lexend({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className="w-full bg-black flex flex-col items-center bg-grid-blue-400/[0.15] justify-center overflow-hidden"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="flex flex-col z-50 -mt-72">
        <h1 className="md:text-7xl pt-72 text-5xl tracking-normal lg:text-6xl font-bold text-center text-white relative ">
          PantryPal
        </h1>

        <div>
          <div className="inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-full blur-sm" />
          <div className="inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-full" />
          <div className="inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-600 to-transparent h-[5px] w-full blur-sm" />
          <div className="inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-600 to-transparent h-px w-full" />
        </div>
        <p
          className="my-1 text-white p-3 text-center tracking-wide text-lg"
          style={{ fontFamily: badscript.style.fontFamily }}
        >
          A convenient marketplace for{" "}
          <span
            className="font-bold"
            style={{ fontFamily: lexend.style.fontFamily }}
          >
            MH-4 hostel{" "}
          </span>
          residents, providing a space to buy, sell, or exchange everything from
          food to essentials.
        </p>
        <div className="flex flex-col items-center">
          <Image alt={"dwjo"} src={"/logo.svg"} width={130} height={130} />
        </div>
        <Track />
        <div
          className="self-center
         mt-8 z-50"
        >
          <Link href="/getstarted">
            <div className="flex flex-col items-center">
              <Button
                borderRadius="2px"
                className="bg-black text-white text-lg dark:bg-slate-900  dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Create Account
              </Button>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
