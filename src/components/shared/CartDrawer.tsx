"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { BrushCleaning, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import CartItem from "./CartItem";
import { useCartStore } from "@/store/cart.store";
import { Badge } from "../ui/badge";

export default function CartDrawer() {
  // cart store
  const { trigger, isOpen, items } = useCartStore((state) => state);

  return (
    <Drawer open={isOpen} direction="right" handleOnly dismissible={false}>
      <DrawerContent>
        <DrawerHeader className="border-b !border-gray-300">
          <DrawerTitle>
            Cart
            <Badge className="!p-1.5 aspect-square rounded-full ml-2">
              {items.length}
            </Badge>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col gap-5 px-4 py-5">
            {items.map((_, index) => (
              <CartItem key={index} />
            ))}
          </div>
        </div>
        <DrawerFooter className="border-t !border-gray-300">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              <Link href={"/checkout"} className="flex-1/2">
                <Button className="cursor-pointer w-full">
                  <ShoppingCart />
                  Checkout
                </Button>
              </Link>
              <Button variant="outline" className="cursor-pointer flex-1/2">
                <BrushCleaning />
                Clear Cart
              </Button>
            </div>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={trigger}
            >
              <X />
              Close
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
