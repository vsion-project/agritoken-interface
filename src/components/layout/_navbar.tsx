'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

import { BiSolidCoin } from "react-icons/bi";

import ButtonConnect from '@/components/connect/button'


interface TypeLink {
  label: string,
  route: string
}

const links: TypeLink[] = [
  { label: 'Inicio', route: '/' }
]

const NavbarLayout = () => {

  return (
    <Navbar position="static" >
      <NavbarBrand>
        <p className="font-bold text-inherit">Agritoken</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link, idx) => (
          <NavbarItem key={idx}>
            <Link color="foreground" href={link.route}>
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem >
          <ButtonConnect />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarLayout;