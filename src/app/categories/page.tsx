import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getAllCategories } from "@/lib/categories";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  // all categories
  const categories = await getAllCategories();

  // grid element class
  const gridEleClass = clsx(
    "first:col-span-2 first:row-span-2 first:!aspect-auto", // first element
    "[&:nth-child(4n)]:col-span-2 [&:nth-child(4n)]:row-span-2 [&:nth-child(4n)]:!aspect-auto", // 5 element
    "col-span-2 aspect-[16/12]"
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 md:grid-cols-6 max-sm:gap-3 gap-5">
        {categories.map((category) => (
          <Link
            href={`/shop?categories=${category.id}`}
            key={category.id}
            className={`!p-0 !overflow-hidden group cursor-pointer relative ${gridEleClass}`}
          >
            {category.image_url && (
              <Image
                fill
                draggable={false}
                alt={category.name}
                src={category.image_url}
                className="!object-cover !w-full !h-full group-hover:scale-105 transition-transform duration-300"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 bg-opacity-50 text-white p-4 max-md:p-2.5">
              <h2 className="text-xl font-bold">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
