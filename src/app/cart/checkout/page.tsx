"use client";

const MapPicker = dynamic(() => import("@/components/checkout/MapPicker"), {
  ssr: false,
});
import Divider from "@/components/shared/Divider";
import MyBreadcrumb from "@/components/shared/MyBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  checkoutFormSchema,
  CheckoutInputs,
  ShippingMethod,
} from "@/schemas/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import { useForm, useWatch } from "react-hook-form";

const shippingMethods = [
  {
    name: "Standard Delivery",
    cost: 9.99,
    duration: "5-7 business days",
    value: ShippingMethod.REGULAR,
  },
  {
    name: "Express Delivery",
    cost: 13.99,
    duration: "2-3 business days",
    value: ShippingMethod.EXPRESS,
  },
  {
    name: "Overnight Delivery",
    cost: 19.99,
    duration: "Next business days",
    value: ShippingMethod.OVERNIGHT,
  },
];

export default function Page() {
  // react-hook-form
  const form = useForm<CheckoutInputs>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingMethod: ShippingMethod.REGULAR,
      address: "",
      city: "",
      email: "",
      fname: "",
      lname: "",
      phone: "",
      promoCode: "",
      state: "",
      zipcode: "",
    },
  });

  //  watcher hook
  const { promoCode } = useWatch({ control: form.control });

  // checkout handler
  const checkoutHandler = async (data: CheckoutInputs) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
        {/* breadcrumb */}
        <MyBreadcrumb
          links={[
            { name: "Home", path: "/" },
            { name: "Cart", path: "/cart" },
            { name: "Checkout" },
          ]}
        />

        {/* shipping form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(checkoutHandler)}>
            <div className="flex gap-10 items-start">
              {/* left card */}
              <Card className="w-5/8 md:sticky md:top-20">
                <CardHeader className="border-b border-primary/40">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Contact Information */}
                  <div className="flex flex-col gap-3">
                    <Divider position="start">
                      <h6 className="font-semibold text-primary">
                        Contact Information
                      </h6>
                    </Divider>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3">
                      {/* email field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel
                              className="text-gray-500"
                              htmlFor={field.name}
                            >
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={field.name}
                                placeholder="john@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* phone no field */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel
                              className="text-gray-500"
                              htmlFor={field.name}
                            >
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={field.name}
                                placeholder="+1 (555) 123-4567"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="flex flex-col gap-3">
                    <Divider position="start">
                      <h6 className="font-semibold text-primary">
                        Shipping Address
                      </h6>
                    </Divider>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3">
                      {/* first name field */}
                      <FormField
                        control={form.control}
                        name="fname"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel
                              className="text-gray-500"
                              htmlFor={field.name}
                            >
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={field.name}
                                placeholder="John"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* last name field */}
                      <FormField
                        control={form.control}
                        name="lname"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel
                              className="text-gray-500"
                              htmlFor={field.name}
                            >
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={field.name}
                                placeholder="Doe"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* address field */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="space-y-1 col-span-full">
                            <div className="flex justify-between items-center">
                              <FormLabel
                                className="text-gray-500"
                                htmlFor={field.name}
                              >
                                Address
                              </FormLabel>
                              <MapPicker
                                onConfirm={({ address, name }) => {
                                  form.setValue("address", name);
                                  form.setValue("city", address.city);
                                  form.setValue("state", address.state);
                                  form.setValue("zipcode", address.postcode);
                                }}
                              >
                                <button
                                  type="button"
                                  className="text-sm text-primary flex items-center gap-1 cursor-pointer underline hover:no-underline !outline-none"
                                >
                                  <MapPin className="w-4 h-4" />
                                  Pick Address
                                </button>
                              </MapPicker>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                id={field.name}
                                placeholder="123 Main Street"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormItem className="space-y-1 col-span-full">
                        <FormLabel
                          className="text-gray-500"
                          htmlFor="apartment"
                        >
                          Apartment, suite, etc. (optional)
                        </FormLabel>
                        <FormControl>
                          <Input id="apartment" placeholder="Apt 4B" />
                        </FormControl>
                      </FormItem>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full">
                        {/* state field */}
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel
                                className="text-gray-500"
                                htmlFor={field.name}
                              >
                                State
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id={field.name}
                                  placeholder="NY"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* city field */}
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel
                                className="text-gray-500"
                                htmlFor={field.name}
                              >
                                City
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id={field.name}
                                  placeholder="New York"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* zipcode field */}
                        <FormField
                          control={form.control}
                          name="zipcode"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel
                                className="text-gray-500"
                                htmlFor={field.name}
                              >
                                ZIP Code
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id={field.name}
                                  placeholder="10001"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="flex flex-col gap-3">
                    <Divider position="start">
                      <h6 className="font-semibold text-primary">
                        Shipping Method
                      </h6>
                    </Divider>

                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <RadioGroup
                          value={String(field.value)}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <div className="space-y-3 pl-3">
                            {shippingMethods.map(
                              ({ cost, name, duration, value }) => (
                                <FormItem key={value}>
                                  <FormLabel
                                    htmlFor={String(value)}
                                    className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={String(value)}
                                        id={String(value)}
                                      />
                                    </FormControl>
                                    <div className="flex-1 cursor-pointer">
                                      <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-0.5">
                                          <p className="font-semibold">
                                            {name}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            {duration}
                                          </p>
                                        </div>
                                        <span className="font-semibold text-lg">
                                          ${cost}
                                        </span>
                                      </div>
                                    </div>
                                  </FormLabel>
                                </FormItem>
                              )
                            )}
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* right card */}
              <Card className="w-3/8 md:sticky md:top-20">
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <Divider position="start">
                      <h6 className="font-semibold text-primary">
                        Review Cart
                      </h6>
                    </Divider>

                    {/* promo code input */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        {/* promo code field */}
                        <FormField
                          control={form.control}
                          name="promoCode"
                          render={({ field }) => (
                            <FormItem className="!flex-1">
                              <FormControl>
                                <Input
                                  {...field}
                                  id={field.name}
                                  placeholder="Enter Promo Code"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          className="cursor-pointer"
                          disabled={!promoCode}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="flex justify-between items-center text-gray-500 ">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-bold">$300</span>
                      </p>
                      <p className="flex justify-between items-center text-gray-500 ">
                        <span className="text-sm">Discount</span>
                        <span className="font-bold">$300</span>
                      </p>
                      <p className="flex justify-between items-center text-gray-500 ">
                        <span className="text-sm">Shipping Charge</span>
                        <span className="font-bold">$300</span>
                      </p>
                      <Separator className="mt-2" />
                      <p className="flex justify-between items-center text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold">$300</span>
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size={"lg"}
                      className="cursor-pointer"
                    >
                      Pay Now
                      <ArrowRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
