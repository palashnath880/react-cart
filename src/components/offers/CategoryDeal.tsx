import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

export default function CategoryDeal() {
  const dealCategories = [
    {
      title: "Makeup",
      discount: "Up to 60% Off",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      title: "Skincare",
      discount: "40-70% Off",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=200&fit=crop",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
    },
    {
      title: "Dress",
      discount: "Up to 50% Off",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=200&fit=crop",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      title: "Haircare",
      discount: "30-55% Off",
      image:
        "https://images.unsplash.com/photo-1610595433626-e45abdb5a88b?w=300&h=200&fit=crop",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Deals by Category</h2>
          <p className="text-muted-foreground">
            Huge discounts across all categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealCategories.map((category, index) => (
          <Card
            key={index}
            className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 !py-0"
          >
            <div className="relative">
              <div className="aspect-video">
                <Image
                  width={200}
                  height={140}
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute inset-0 ${category.color} opacity-80`}
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                <p className="text-sm">{category.discount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
