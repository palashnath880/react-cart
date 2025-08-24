"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopFilterSchema, ShopFilterType } from "@/schemas/filter.schama";
import { useRouter, useSearchParams } from "next/navigation";

// brands
const brands = [
  {
    name: "Zara",
    total: 25.3,
    country: "Spain",
  },
  {
    name: "H&M",
    total: 22,
    country: "Sweden",
  },
  {
    name: "Gucci",
    total: 12.7,
    country: "Italy",
  },
  {
    name: "Louis Vuitton",
    total: 15.2,
    country: "France",
  },
  {
    name: "Chanel",
    total: 13.1,
    country: "France",
  },
  {
    name: "Nike",
    total: 44.5,
    country: "USA",
  },
  {
    name: "Adidas",
    total: 23.6,
    country: "Germany",
  },
  {
    name: "Uniqlo",
    total: 19.1,
    country: "Japan",
  },
  {
    name: "Prada",
    total: 4.5,
    country: "Italy",
  },
  {
    name: "Dior",
    total: 11.8,
    country: "France",
  },
  {
    name: "Forever 21",
    total: 3.8,
    country: "USA",
  },
  {
    name: "ASOS",
    total: 4.2,
    country: "UK",
  },
  {
    name: "Balenciaga",
    total: 7.1,
    country: "France",
  },
  {
    name: "Victoria's Secret",
    total: 7.3,
    country: "USA",
  },
  {
    name: "Mango",
    total: 2.4,
    country: "Spain",
  },
];

export default function ProductFilter() {
  // useRouter hook
  const router = useRouter();

  // get query params and parse them using zod schema
  const searchParams = useSearchParams();
  const queryParams = {
    ...Object.fromEntries(searchParams.entries()),
    priceRange: {
      min: searchParams.get("minPrice") || 0,
      max: searchParams.get("maxPrice") || 5000,
    },
    brands: searchParams.getAll("brands"),
  };

  // parse the query params
  const {
    priceRange,
    categories,
    rating,
    brands: selectedBrands,
  } = shopFilterSchema.parse(queryParams);

  // react hook form
  const form = useForm<ShopFilterType>({
    resolver: zodResolver(shopFilterSchema) as any,
    defaultValues: {
      priceRange,
      brands: selectedBrands,
      categories,
      rating,
    },
  });

  // search handler
  const onSubmit = (data: ShopFilterType) => {
    const query = new URLSearchParams();
    // if price is available
    if (data.priceRange) {
      if (data.priceRange.min !== undefined) {
        query.set("minPrice", data.priceRange.min.toString());
      }
      if (data.priceRange.max !== undefined) {
        query.set("maxPrice", data.priceRange.max.toString());
      }
    }

    // if brands is available
    if (data.brands && data.brands.length > 0) {
      data.brands.forEach((brand) => {
        query.append("brands", brand);
      });
    }

    // if rating is available
    if (data.rating) {
      query.set("rating", data.rating.toString());
    }

    // push the query to url
    router.push(`/shop?${query.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`lg:w-80 ${false ? "block" : "hidden lg:block"}`}
      >
        <Card className="sticky top-24">
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  // onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Price Range field */}
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl className="mt-2">
                      <Slider
                        value={[field.value.min, field.value.max]}
                        onValueChange={(val) =>
                          field.onChange({ min: val[0], max: val[1] })
                        }
                        step={10}
                        max={5000}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Brands field*/}
              <FormField
                control={form.control}
                name="brands"
                render={() => (
                  <FormItem>
                    <FormLabel>Brands</FormLabel>
                    <div className="mt-2 flex flex-col gap-3">
                      {brands.map(({ name, total }, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name="brands"
                          render={({ field }) => (
                            <FormItem
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(name)}
                                  id={`${name}-${index}`}
                                  onCheckedChange={(checked) => {
                                    const values = field.value || [];
                                    return checked
                                      ? field.onChange([...values, name])
                                      : field.onChange(
                                          values?.filter((val) => val !== name)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={`${name}-${index}`}
                                className="text-muted-foreground"
                              >
                                {name}
                                <span>({total})</span>
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl className="mt-2">
                      <RadioGroup
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                        className="flex flex-col gap-3"
                      >
                        {[4, 3, 2, 1].map((rating) => (
                          <FormItem
                            key={rating}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <FormControl>
                              <RadioGroupItem
                                id={`rating-${rating}`}
                                value={rating.toString()}
                              />
                            </FormControl>
                            <FormLabel htmlFor={`rating-${rating}`}>
                              {rating}+ Stars
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          {/* card footer */}
          <CardFooter>
            <Button className="w-full cursor-pointer" type="submit">
              Apply Filters
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
