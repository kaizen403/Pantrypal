"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Input } from "../ui/input";
import { Button } from "@/components/ani_ui/Movingborder";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";

export default function Nav() {
  return (
    <Navbar isBordered isBlurred className="bg-slate-950 z-50">
      <Image alt={"logo"} src={"/logo.svg"} width={32} height={32} />
      <NavbarBrand>
        <p className="font-bold tracking-wide text-white">PantryPal</p>
      </NavbarBrand>
      <NavbarContent className=" gap-4" justify="center">
        <NavbarItem>
          <Link className="font-bold text-white" color="foreground" href="/buy">
            Buy
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="font-bold text-white"
            color="foreground"
            href="/sell"
          >
            Sell
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="font-bold text-white"
            color="foreground"
            href="#"
          ></Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden items-center gap-2">
          {/* <div className="ml-auto flex items-center gap-4 lg:gap-2">
            <Button
              borderRadius="2px"
              className="bg-slate-800 text-white text-lg dark:bg-slate-900  dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <ShoppingCartIcon className="w-4 h-4" /> Cart
            </Button>
          </div> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
