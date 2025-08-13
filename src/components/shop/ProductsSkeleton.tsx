import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function ProductsSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="!pt-0">
          <Skeleton className="aspect-[16/12]" />
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="w-0 h-0 px-10 py-3" />
            <Skeleton className="h-0 py-4" />
            <Skeleton className="h-0 py-3" />
          </CardContent>
          <CardFooter>
            <div className="flex justify-between items-center w-full gap-6">
              <Skeleton className="flex-1 py-5 h-0" />
              <Skeleton className="w-0 px-10 py-5 h-0" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
