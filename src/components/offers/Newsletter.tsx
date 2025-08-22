"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useSubscribe from "@/hooks/useSubscribe";

export default function Newsletter() {
  // useSubscribe hook
  const { inputRef, loading, subscribe } = useSubscribe();

  return (
    <Card
      className="border-primary/30 bg-repeat-x bg-contain"
      style={{
        backgroundImage:
          "linear-gradient(#00000010, #00000010), url(/images/newsletter-background.webp)",
      }}
    >
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Never Miss a Deal!</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Subscribe to our newsletter and be the first to know about exclusive
          offers and flash sales.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-primary/50"
            ref={inputRef}
            disabled={loading}
          />
          <Button
            className="cursor-pointer"
            onClick={subscribe}
            disabled={loading}
          >
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
