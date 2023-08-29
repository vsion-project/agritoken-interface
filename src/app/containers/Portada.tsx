'use client'
import AvatarImage from "@/components/avatarNFT/avatarImage";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Portada() {
  return (
    <div className="grid gap-8">
      <div className='flex flex-col md:flex-row gap-8'>
        <div className=' w-2/3 text-5xl text-yellow-600 font-extrabold z-10  bg-black/70 rounded-md shadow-2xl p-4'>
          <h2 className="mb-4">
            Se parte del primer ecosistema agricola compartido!
          </h2>
          <h2>
            Cultivos tradicionales tokenizados para promover la participacion global.
          </h2>
          <div>
            <Link href='/projects/1'>
              <Button variant="solid" color="warning" size="lg"> Participar</Button>
            </Link>
          </div>
        </div>
        <div className="w-1/3">
          <AvatarImage />
        </div>
      </div>

    </div>
  )
}
