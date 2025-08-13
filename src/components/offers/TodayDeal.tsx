import React from "react";
import Product from "../shared/Product";
import products from "../../../data/products.json";
import { Button } from "../ui/button";
import { Gift } from "lucide-react";

export default function TodayDeal() {
  const todayDeals = products
    .filter((a) => a.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Today's Special Deals</h2>
          <p className="text-muted-foreground">
            Hand-picked deals just for today
          </p>
        </div>
        <Button className="cursor-pointer">
          <Gift className="h-4 w-4 mr-2" />
          More Deals
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayDeals.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
