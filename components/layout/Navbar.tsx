import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Nav() {
  return (
    <Navbar isBordered isBlurred className="bg-slate-950">
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
          <Link className="font-bold text-white" color="foreground" href="#">
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
        <NavbarItem className=" items-center gap-2">
          <Button variant="outline">Sign Out</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
