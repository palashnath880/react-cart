"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
import { Badge } from "../ui/badge";
import SearchPopup from "../shared/SearchPopup";

export default function Header() {
  // cart store
  const trigger = useCartStore((state) => state.trigger);
  const cartItems = useCartStore((state) => state.items);
  const getAll = useCartStore((state) => state.getAll);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Shop", path: "/shop" },
    { name: "Offers", path: "/offers" },
  ];

  // use effect
  useEffect(() => {
    getAll();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              width={60}
              height={60}
              alt="Logo"
              src={"/images/color-logo.png"}
              className="w-10 h-auto"
            />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchPopup />
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm hover:text-primary duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search icon for mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href={"/wishlist"}>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Heart />
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer relative"
              onClick={trigger}
            >
              <ShoppingCart />
              {cartItems.length > 0 && (
                <Badge className="!rounded-full !p-1.5 !aspect-square absolute -top-1 -right-1">
                  {cartItems.length}
                </Badge>
              )}
            </Button>

            {/* Account */}
            <Link href="/my-account">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <User />
              </Button>
            </Link>

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
