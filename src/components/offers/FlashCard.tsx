"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, Zap } from "lucide-react";

const flashDeals = [
  {
    id: "1",
    name: "Wireless Gaming Mouse",
    price: 29.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    badge: "Flash Sale",
    soldPercentage: 85,
  },
  {
    id: "2",
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    badge: "50% Off",
    soldPercentage: 92,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 203,
    badge: "Limited Time",
    soldPercentage: 67,
  },
];

export default function FlashCard() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="mb-8 bg-gradient-to-r from-primary to-pink-400 border-primary/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white font-bold">
                Flash Sale
              </CardTitle>
              <p className="text-white/95">Limited time offers ending soon!</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-white" />
            <div className="flex gap-1 text-2xl font-bold text-white">
              <span className="bg-white text-primary px-2 py-1 rounded">
                {timeLeft.hours.toString().padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-white text-primary px-2 py-1 rounded">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-white text-primary px-2 py-1 rounded">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* {flashDeals.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard {...product} />
              {product.soldPercentage && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Sold</span>
                    <span className="font-medium">
                      {product.soldPercentage}%
                    </span>
                  </div>
                  <Progress value={product.soldPercentage} className="h-2" />
                </div>
              )}
            </div>
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
}
