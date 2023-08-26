'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

//Wagmi
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { BiSolidCoin } from "react-icons/bi";

interface TypeLink {
  label: string,
  route: string
}

const links: TypeLink[] = [
  { label: 'Home', route: '/' }
]

const NavbarLayout = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return (
    <Navbar position="static">
      <NavbarBrand>
        <BiSolidCoin />
        <p className="font-bold text-inherit">Agri</p>
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
        <NavbarItem className="hidden lg:flex">
          {isConnected
            ? (<div>
              <Button onClick={() => disconnect()}>
                Connected to {address?.slice(0, 6)}...{address?.slice(address.length - 6)}
              </Button>
            </div>)
            : (<Button color="primary" onClick={() => connect()}>Connect Wallet</Button>)
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarLayout;