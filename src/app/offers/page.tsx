import CategoryDeal from "@/components/offers/CategoryDeal";
import FlashCard from "@/components/offers/FlashCard";
import Newsletter from "@/components/offers/Newsletter";
import TodayDeal from "@/components/offers/TodayDeal";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="py-16 bg-repeat-round"
        style={{
          backgroundImage: `linear-gradient(#00000045, #00000045), url(/images/offers-bg.jpg)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Super Sale Event
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Mega Deals & Offers
          </h1>
          <p className="text-xl mb-8  max-w-2xl mx-auto text-white/80">
            Discover incredible savings on your favorite products. Limited time
            offers you don't want to miss!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Flash Sale Countdown */}
        <FlashCard />

        {/* Category Deals */}
        <CategoryDeal />

        {/* Today's Special Deals */}
        <TodayDeal />

        {/* Newsletter Signup */}
        <Newsletter />
      </div>
    </div>
  );
}
