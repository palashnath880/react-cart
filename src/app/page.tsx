import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, RotateCcw, Shield, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";
import categories from "../../data/categories.json";
import products from "../../data/products.json";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Product from "@/components/shared/Product";

export default function page() {
  // feature list
  const features = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round the clock help",
    },
  ];

  // slice 4 categories
  const top4Categories = categories
    .sort((a, b) => b.total_products - a.total_products)
    .slice(0, 4);

  // featured products
  const featuredProducts = products
    .sort((a, b) => b.total_sold - a.total_sold)
    .slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <Badge className="mb-4">🎉 New Collection Available</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight font-lora">
              Discover Amazing
              <span className="block"> Products</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl text-muted-foreground">
              Shop the latest trends with unbeatable prices and fast delivery.
              Your perfect shopping experience starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="cursor-pointer">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                View Offers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">
                Find what you're looking for
              </p>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="cursor-pointer">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {top4Categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 !py-0"
              >
                <div className="relative overflow-hidden">
                  <Image
                    width={220}
                    height={120}
                    src={category.img_url}
                    alt={category.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-base text-white/80">
                      {category.total_products}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our most popular items</p>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="cursor-pointer">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        {/* left image */}
        <Image
          draggable={false}
          src={"/images/lipstick.png"}
          width={300}
          height={200}
          alt="Lipstick"
          className="absolute w-32 bottom-0 left-0 rotate-[30deg]"
        />

        {/* right image */}
        <Image
          draggable={false}
          src={"/images/bag.png"}
          width={300}
          height={200}
          alt="Bag"
          className="absolute h-[80%] -right-28 top-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(#00000050 0px 12px 10px)" }}
        />

        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join thousands of satisfied customers and discover amazing deals
            every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/register"}>
              <Button size="lg" className="cursor-pointer">
                Create Account
              </Button>
            </Link>
            <Link href={"/shop"}>
              <Button variant="outline" size="lg" className="cursor-pointer">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
