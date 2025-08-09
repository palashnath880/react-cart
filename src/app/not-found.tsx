import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <section className="h-[70vh] flex items-center justify-center">
      <div className="lg:w-3xl">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex gap-2 text-9xl font-bold">
            <span>4</span>
            <span className="text-primary">0</span>
            <span>4</span>
          </div>
          <h1 className="text-4xl font-bold uppercase">OPPS! Page Not Found</h1>
          <p className="text-sm text-muted-foreground">
            Sorry! the page you're looking for doesn't exists.
          </p>
          <Link href={"/"} className="mt-6">
            <Button className="cursor-pointer" size={"lg"}>
              <Home /> Go Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
