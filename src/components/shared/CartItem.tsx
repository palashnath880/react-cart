import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function CartItem() {
  return (
    <Card className="!py-3">
      <CardContent className="flex gap-3 !px-3">
        <div className="aspect-[16/12] overflow-hidden w-28">
          <Image
            src={"/images/color-logo.png"}
            width={130}
            height={130}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-bold">Cart Item</h1>
          <div className="flex gap-2 text-muted-foreground italic text-sm">
            <span>$400</span>
            <span>X</span>
            <span>4</span>
            <span>=</span>
            <b>$300</b>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
