import { CircularProgress } from '@nextui-org/react';
import React from 'react';


const LoaderTx = () => {
  return (
    <div className={`bg-black/60 w-full h-full z-[51] grid justify-center align-middle text-8xl fixed  top-0 left-0`}>
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        color="warning"
        className='text-3xl'
        disableAnimation={false}
      />
    </div>
  );
};

export default LoaderTx;