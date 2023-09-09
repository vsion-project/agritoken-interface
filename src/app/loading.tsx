'use client'

import React, { Suspense } from 'react';
import LogoAgritokenSimple from "@/components/svg/logoAgritokenSimple"

const AgritokenLoader = () => {
  return (
    <div
      className='bg-logo-white bg-repeat-space bg-[length:100px_100px] fill-slate-400 w-full h-full fixed left-0 top-0 z-50 grid justify-center items-center bg-primary'
    >
      <Suspense fallback={<></>}>
        <LogoAgritokenSimple
          className='animate-round'
          width={120} />
      </Suspense >
    </div >
  );
};

export default AgritokenLoader;

