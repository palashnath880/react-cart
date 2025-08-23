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
import { useCartStore } from "@/store/cart.store";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Product } from "@/interfaces/product";

// CartItem component props
type CartItemProps = {
  product: Product;
  quantity: number;
  id: string;
  user_id: string;
};

/**
 * Cart Drawer component
 * @returns
 */
export default function CartDrawer() {
  // cart store
  const { trigger, isOpen, items, remove, isLoading } = useCartStore(
    (state) => state
  );

  return (
    <Drawer open={isOpen} direction="right" onOpenChange={trigger}>
      <DrawerContent>
        <DrawerHeader className="border-b !border-gray-300">
          <DrawerTitle>
            Cart
            <Badge className="!p-1.5 aspect-square rounded-full ml-2">
              {items.length}
            </Badge>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto relative">
          <div className="flex flex-col gap-3 px-4 py-5">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          {/* loading */}
          <div
            className={`absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-[1px] grid place-items-center duration-200 transition-all ${
              isLoading ? "visible" : "invisible"
            }`}
          >
            <div>
              <ShoppingCart className="animate-pulse w-12 h-12" />
            </div>
          </div>
        </div>
        <DrawerFooter className="border-t !border-gray-300">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              <Button asChild className="cursor-pointer w-full">
                <Link
                  href={"/cart/checkout"}
                  className="flex-1/2"
                  onClick={() => trigger()}
                  aria-label="Checkout"
                >
                  <ShoppingCart />
                  Checkout
                </Link>
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer flex-1/2"
                onClick={() => remove()}
                disabled={items.length <= 0 || isLoading}
                aria-label="Clear Cart"
              >
                <BrushCleaning />
                Clear Cart
              </Button>
            </div>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={trigger}
              disabled={isLoading}
              aria-label="Cart Drawer Close"
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

/**
 * Cart Drawer Single Cart Item Component
 * @returns
 */
export function CartItem({ product, quantity }: CartItemProps) {
  return (
    <Card className="!py-3 !rounded-lg">
      <CardContent className="flex gap-3 items-start !px-3">
        <div className="aspect-[16/11] overflow-hidden w-28">
          <Image
            src={product.img_url}
            width={130}
            height={130}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h6 className="text-sm font-semibold">{product.title}</h6>
          <div className="flex gap-2 text-muted-foreground italic text-sm">
            <span>${product.price.base}</span>
            <span>X</span>
            <span>{quantity}</span>
            <span>=</span>
            <b>${(product.price.base * quantity).toFixed(2)}</b>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
