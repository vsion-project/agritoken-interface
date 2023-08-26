import Link from 'next/link';
import React from 'react';
import { BiLink } from 'react-icons/bi';

type TBinanceOption = 'tx' | 'address' | 'block'

interface TPropsLinkBinance {
  transaction: string
  option?: TBinanceOption
  textPrev?: string,
  className?: string
}

const LinkBinance = (props: TPropsLinkBinance) => {
  const { transaction, option = 'tx', textPrev, className } = props
  const isProduction = process.env.enviroment === 'production'
  return (
    <span>
      {textPrev && `${textPrev} `}
      <Link
        className={className}
        target='_blank'
        href={`https://${isProduction ? '' : 'testnet.'}bscscan.com/${option}/${transaction}`}
      >
        {transaction.slice(0, 6)}...{transaction.slice(transaction.length - 6, transaction.length)}
        <BiLink />
      </Link>
    </span >
  );
};

export default LinkBinance;