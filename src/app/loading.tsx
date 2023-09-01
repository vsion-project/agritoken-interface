'use client'
import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <Skeleton className="rounded-lg">
        <div className="h-40 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-40 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
}