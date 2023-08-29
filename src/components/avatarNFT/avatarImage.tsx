"use client"

import React from 'react';
import { motion } from "framer-motion";
import { Image } from '@nextui-org/react';

const AvatarImage = () => {
  return (
    <>
      <div className='relative '>
        <motion.div
          className="w-60 rounded-lg absolute top-0 z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image src='/token/post_corn_1_4.png' alt='1/4' />
        </motion.div>
        <motion.div
          className="w-60 rounded-lg absolute top-8 left-8 z-20"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image src='/token/post_corn_1_2.png' alt='1/4' />
        </motion.div>
        <motion.div
          className="w-60 rounded-lg absolute top-16 left-16 z-30"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image src='/token/post_corn_1.png' alt='1/4' />
        </motion.div>
      </div>
    </>
  );
};

export default AvatarImage;