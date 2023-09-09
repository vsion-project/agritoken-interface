'use client'
import React, { Suspense } from "react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, } from "@nextui-org/react";

import ButtonConnect from '@/components/connect/button'
import Link from "next/link.js";
import LogoAgritoken from "@/components/svg/logoAgritoken"
import { Web3Button } from "@web3modal/react";
import ConnectButton from "@/components/connect/button";

interface TypeLink {
  label: string,
  route: string
}

const links: TypeLink[] = [
  { label: 'Inicio', route: '/' }
]

const NavbarLayout = () => {

  return (
    <Navbar position="static" className="bg-sky-900/80" classNames={{ menu: 'bg-transparent' }} >
      <NavbarBrand className="flex justify-between sm:justify-start gap-2">
        <NavbarMenuToggle
          // aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"

        />
        <Link color="foreground" href='/' >
          <LogoAgritoken width={120} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link, idx) => (
          <NavbarItem key={idx} className="text-white text-lg font-bold">
            <Link color="foreground" href={link.route} >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" >
        <NavbarItem >
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-black/60">
        <NavbarMenuItem >
          <ConnectButton />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarLayout;