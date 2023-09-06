"use client"

import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';

const AvatarImage = () => {
  return (
    <>
      <div className='relative w-80'>
        <motion.div
          className="w-40 sm:w-60 lg:w-80 rounded-lg absolute top-0 z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            width={500}
            height={500}
            src='/token/post_corn_1_4.png'
            className='rounded-xl'
            alt='1/4'
            sizes="(min-width: 1040px) 320px, (min-width: 640px) 240px, 160px"
          />
        </motion.div>
        <motion.div
          className="w-40 sm:w-60 lg:w-80 rounded-lg absolute top-8 left-8 lg:top-16 lg:left-16 z-20"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            width={500}
            height={500}
            src='/token/post_corn_1_2.png'
            className='rounded-xl'
            alt='1/2'
            sizes="(min-width: 1040px) 320px, (min-width: 640px) 240px, 160px"
          />
        </motion.div>
        <motion.div
          className="w-40 sm:w-60 lg:w-80 rounded-lg absolute top-16 left-16 lg:top-32 lg:left-32 z-30"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            width={500}
            height={500}
            src='/token/post_corn_1.png'
            className='rounded-xl'
            alt='1 hect'
            sizes="(min-width: 1040px) 320px, (min-width: 640px) 240px, 160px"
          />
        </motion.div>
      </div>
    </>
  );
};

export default AvatarImage;