'use client'
import AvatarImage from "@/components/avatarNFT/avatarImage";
import { Button, Skeleton } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Suspense } from "react";

export default function Portada() {

  const { push } = useRouter();
  const handleRefresh = () => {
    push('/projects/1');
  };
  return (
    <div className="grid gap-8">
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-2/3 text-3xl md:text-3xl lg:text-5xl text-yellow-500 font-extrabold z-10 bg-black/70 rounded-md shadow-2xl p-8 grid gap-8'>
          <h2 className="">
            Se parte del primer ecosistema agricola compartido!
          </h2>
          <h2>
            Cultivos tradicionales tokenizados para promover la participacion global.
          </h2>
          <div>
            <Button onClick={() => handleRefresh()} className="uppercase text-xl font-bold" variant="ghost" color="warning" size="lg">
              Participar
            </Button>
          </div>
        </div>
        <div className="md:w-2/3 grid justify-center">
          <Suspense fallback={<Skeleton className="rounded-lg">
            <div className="w-full before:block before:pb-[100%] rounded-lg bg-default-300"></div>
          </Skeleton>}>
            <AvatarImage />
          </Suspense>
        </div>
      </div>

    </div >
  )
}
