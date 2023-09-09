import React from 'react';
import LogoAgritokenSimple from "@/components/svg/logoAgritokenSimple"

interface TPropsLoader {
  value: number
}

const AgritokenLoader = (props: TPropsLoader) => {
  const { value } = props
  return (
    <div className='w-full h-full fixed z-50 grid justify-center align-middle bg-primary text-8xl'>
      <div>
        <LogoAgritokenSimple width={120} />
        <span className='text-2xl text-white'>Agritoken</span>
      </div>
    </div>
  );
};

export default AgritokenLoader;