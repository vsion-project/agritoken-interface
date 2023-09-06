'use client'

import { CircularProgress } from '@nextui-org/react';
import React, { Suspense } from 'react';


export default function Loading() {
  return (
    <div className='w-full h-full fixed left-0 top-0 z-50 grid justify-center align-middle bg-green-700 text-8xl'>
      <Suspense fallback={<></>}>

        <CircularProgress
          classNames={{
            label: 'text-2xl text-white'
          }}
          aria-label="Loading..."
          size="lg"
          color="warning"
          label="Agritoken"
          className='text-3xl'
          disableAnimation={false}
        />
      </Suspense>
    </div>
  );
};