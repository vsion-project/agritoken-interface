
import React from 'react';
import CardList from './ListCard';


const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <CardList id={id} />
    </>
  );
};

export default page;