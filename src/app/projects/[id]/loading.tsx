'use client'
import React from "react";
import { CircularProgress, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="rounded-lg">
        <div className="w-full before:block before:pb-[100%] rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="w-full before:block before:pb-[100%] rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="w-full before:block before:pb-[100%] rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
}