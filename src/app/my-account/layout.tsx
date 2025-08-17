"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  LucideProps,
  MapPin,
  Package,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, John!</h1>
              <p className="text-muted-foreground">
                Manage your account and orders
              </p>
            </div>
          </div>
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
                  >
                    <Icon className="h-4 w-4" />
                    {name}
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
