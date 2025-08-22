"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/store/auth.store";
import {
  CreditCard,
  LucideProps,
  MapPin,
  Package,
  Settings,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

// tab links
const links: {
  name: string;
  href: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  { name: "Profile", href: "/", Icon: User },
  { name: "Orders", href: "/orders", Icon: Package },
  { name: "Addresses", href: "/addresses", Icon: MapPin },
  { name: "Payment", href: "/payment", Icon: CreditCard },
  { name: "Settings", href: "/settings", Icon: Settings },
];

// header skeleton
const headerSkeleton = (
  <div className="flex items-center gap-4 mb-4">
    <Skeleton className="h-16 w-16 rounded-full"></Skeleton>
    <div className="space-y-2">
      <Skeleton className="h-6 w-xs max-w-11/12" />
      <Skeleton className="h-4 w-xs max-w-11/12" />
    </div>
  </div>
);

export default function layout({ children }: { children: React.ReactNode }) {
  // usePathname hook
  const pathname = usePathname();

  // auth store
  const { init: initAuth, loading, user } = useAuth((state) => state);

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {loading ? (
            headerSkeleton
          ) : (
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-12 h-12 md:w-16 md:h-16">
                <AvatarImage src="" />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-base sm:text-lg md:text-2xl font-bold">
                  Welcome back, {user?.user_metadata?.displayName}!
                </h1>
                <p className="text-muted-foreground text-sm">
                  Manage your account and orders
                </p>
              </div>
            </div>
          )}
        </div>

        {/* tabs */}
        <div className="flex flex-col gap-5">
          <div className="flex">
            {links.map(({ Icon, name, href }) => {
              const path = "/my-account" + href.replace(/\/$/, "");
              const isActive = pathname === path;
              return (
                <Link href={`/my-account${href}`} key={href} className="flex-1">
                  <Button
                    className="cursor-pointer w-full"
                    variant={isActive ? "default" : "outline"}
                    size={"lg"}
                    disabled={loading}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="max-md:hidden">{name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
