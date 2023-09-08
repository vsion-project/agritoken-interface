
import { Suspense } from "react";
import Portada from "./containers/Portada";
import LogoAgritokenSimple from "@/components/svg/logoAgritokenSimple"


export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-between ">
      <Portada />
    </div>
  )
}
