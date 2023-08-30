import { CircularProgress } from '@nextui-org/react';
import React from 'react';

interface TPropsLoader {
  value: number
}

const AgritokenLoader = (props: TPropsLoader) => {
  const { value } = props
  return (
    <div className='w-full h-full fixed z-50 grid justify-center align-middle bg-green-700 text-8xl'>
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        color="warning"
        label="Agritoken"
        className='text-3xl'
        disableAnimation={false}
      />
    </div>
  );
};

export default AgritokenLoader;