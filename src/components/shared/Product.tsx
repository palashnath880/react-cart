"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import useWishList from "@/store/wishlist.store";
import type { Product } from "@/interfaces/product";
import { useCartStore } from "@/store/cart.store";

type ProductProps = Product;

export default function Product(props: ProductProps) {
  // props destructuring
  const {
    img_url,
    title,
    discount,
    price,
    category_name,
    rating_count,
    avg_rating,
    id,
  } = props;

  // wishlist store
  const { items, trigger } = useWishList((state) => state);
  const isInWishList = items.find((i) => i === id);

  // cart store
  const cart = useCartStore((state) => state);

  return (
    <Card className="group cursor-pointer overflow-hidden border-border/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1 !py-0 !gap-4">
      <div className="relative overflow-hidden aspect-[16/12]">
        <Image
          width={300}
          height={300}
          src={img_url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="/images/color-logo.png"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && <Badge className="!text-sm">- {discount}%</Badge>}
        </div>

        {/* Wishlist button */}
        <Button
          onClick={() => trigger(id)}
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm cursor-pointer ${
            isInWishList ? "!text-primary" : "!text-muted-foreground"
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishList ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="!px-4 flex-1">
        <div className="flex flex-col">
          {/* category */}
          <Link href={"/categories/"}>
            <Badge className="text-sm !rounded-none">{category_name}</Badge>
          </Link>
          <h3 className="font-bold line-clamp-2 text-muted-foreground transition-colors mt-2">
            {title}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(avg_rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({rating_count})
          </span>
        </div>
      </CardContent>

      <CardFooter className="!pb-4 items-center justify-between">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-price">${price.base}</span>
          {discount > 0 && (
            <span className="text-base text-muted-foreground line-through">
              ${price.base}
            </span>
          )}
        </div>

        {/* add to cart button */}
        <Button
          variant={"outline"}
          size={"icon"}
          className="cursor-pointer !rounded-full"
          onClick={() => cart.add(id)}
        >
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}
