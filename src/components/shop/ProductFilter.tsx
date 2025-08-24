"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopFilterSchema, ShopFilterType } from "@/schemas/filter.schama";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand, Category } from "@/interfaces/supabase.type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

// product filter props interface
interface ProductFilterProps {
  categories: Category[];
  brands: Brand[];
}

/**
 *
 * ProductFilter component
 * @param {*} param0
 * @returns {JSX.Element}
 */
export default function ProductFilter(props: ProductFilterProps) {
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
    categories: searchParams.getAll("categories"),
  };

  // parse the query params
  const parseData = shopFilterSchema.parse(queryParams);

  // react hook form
  const form = useForm<ShopFilterType>({
    resolver: zodResolver(shopFilterSchema) as any,
    defaultValues: {
      priceRange: parseData.priceRange,
      brands: parseData.brands,
      categories: parseData.categories,
      rating: parseData.rating,
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

    // if categories is available
    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((cate) => {
        query.append("categories", cate);
      });
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
        className={`lg:w-80 sticky top-24 ${
          false ? "block" : "hidden lg:block"
        }`}
      >
        <Card className="!pt-0">
          <CardContent className="px-4">
            <div className="flex flex-col gap-5">
              <Accordion
                type="multiple"
                defaultValue={["categories", "brands"]}
              >
                {/* Categories field*/}
                <CheckboxField
                  name="categories"
                  control={form.control}
                  label="Categories"
                  options={props.categories.map((i) => ({
                    label: i.name,
                    value: i.id,
                  }))}
                />

                {/* Brands field*/}
                <CheckboxField
                  name="brands"
                  control={form.control}
                  label="Brands"
                  options={props.brands.map((i) => ({
                    label: i.name,
                    value: i.id,
                  }))}
                />

                {/* Price Range field */}
                <AccordionItem value="priceRange">
                  <AccordionTrigger className="!no-underline">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
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
                  </AccordionContent>
                </AccordionItem>

                {/* Rating */}
                <AccordionItem value="rating">
                  <AccordionTrigger className="!no-underline">
                    Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="mt-2">
                            <RadioGroup
                              value={field.value?.toString()}
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>

          {/* card footer */}
          <CardFooter className="px-4">
            <Button className="w-full cursor-pointer" type="submit">
              Apply Filters
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

/**
 *  CheckboxField component
 * @param param0
 * @returns
 */

// Checkbox field component props interface
type CheckboxFieldProps = {
  name: "categories" | "brands";
  control: Control<ShopFilterType>;
  options: { label: string; value: string }[];
  label: string;
};

const CheckboxField = (props: CheckboxFieldProps) => {
  // props destructuring
  const { name, control, options, label } = props;

  return (
    <AccordionItem value={name}>
      <AccordionTrigger className="!no-underline">{label}</AccordionTrigger>
      <AccordionContent>
        <FormField
          control={control}
          name={name}
          render={() => (
            <FormItem className="flex flex-col gap-3">
              {Array.isArray(options) &&
                options.map(({ label, value }) => (
                  <FormField
                    key={value}
                    control={control}
                    name={name}
                    render={({ field }) => (
                      <FormItem key={value} className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            id={value}
                            checked={field.value?.includes(value)}
                            onCheckedChange={(checked) => {
                              const values = field.value || [];
                              return checked
                                ? field.onChange([...values, value])
                                : field.onChange(
                                    values?.filter((val) => val !== value)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor={value}
                          className="text-muted-foreground"
                        >
                          {label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
