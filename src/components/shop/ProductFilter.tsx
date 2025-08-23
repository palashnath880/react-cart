"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { X } from "lucide-react";
// import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";

// brands
// const brands = [
//   {
//     name: "Zara",
//     total: 25.3,
//     country: "Spain",
//   },
//   {
//     name: "H&M",
//     total: 22,
//     country: "Sweden",
//   },
//   {
//     name: "Gucci",
//     total: 12.7,
//     country: "Italy",
//   },
//   {
//     name: "Louis Vuitton",
//     total: 15.2,
//     country: "France",
//   },
//   {
//     name: "Chanel",
//     total: 13.1,
//     country: "France",
//   },
//   {
//     name: "Nike",
//     total: 44.5,
//     country: "USA",
//   },
//   {
//     name: "Adidas",
//     total: 23.6,
//     country: "Germany",
//   },
//   {
//     name: "Uniqlo",
//     total: 19.1,
//     country: "Japan",
//   },
//   {
//     name: "Prada",
//     total: 4.5,
//     country: "Italy",
//   },
//   {
//     name: "Dior",
//     total: 11.8,
//     country: "France",
//   },
//   {
//     name: "Forever 21",
//     total: 3.8,
//     country: "USA",
//   },
//   {
//     name: "ASOS",
//     total: 4.2,
//     country: "UK",
//   },
//   {
//     name: "Balenciaga",
//     total: 7.1,
//     country: "France",
//   },
//   {
//     name: "Victoria's Secret",
//     total: 7.3,
//     country: "USA",
//   },
//   {
//     name: "Mango",
//     total: 2.4,
//     country: "Spain",
//   },
// ];

export default function ProductFilter() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className={`lg:w-80 ${false ? "block" : "hidden lg:block"}`}>
        <Card className="sticky top-24">
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  // onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Price Range */}
              <FormItem>
                <FormLabel className="font-semibold">Price Range</FormLabel>
                <FormControl>
                  <Slider />
                </FormControl>
              </FormItem>

              {/* Brands */}
              <FormItem>
                <FormLabel className="font-semibold">Brands</FormLabel>
                <FormControl className="mt-2">
                  {/* {brands.map(({ name, total }) => (
                    <FormField
                      name="brands"
                      render={({}) => (
                        <FormItem
                          key={name}
                          className="flex items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              id={name}
                              checked
                              className="cursor-pointer"
                            />
                          </FormControl>
                          <FormLabel htmlFor={name} className="cursor-pointer">
                            {name}
                            <span className="text-xs text-muted-foreground">
                              ({total})
                            </span>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))} */}
                </FormControl>
              </FormItem>

              {/* Rating */}
              <FormItem>
                <FormLabel className="font-semibold">Rating</FormLabel>
                <FormControl className="mt-2">
                  <RadioGroup>
                    {[4, 3, 2, 1].map((rating) => (
                      <FormItem
                        key={rating}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <FormControl>
                          <RadioGroupItem
                            id={`rating-${rating}`}
                            value={rating.toString()}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor={`rating-${rating}`}
                          className="cursor-pointer"
                        >
                          {rating}+ Stars
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            </div>
          </CardContent>
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
