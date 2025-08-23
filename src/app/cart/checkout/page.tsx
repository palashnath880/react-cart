"use client";

import MyBreadcrumb from "@/components/shared/MyBreadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const shippingMethods = [
  {
    name: "Standard Delivery",
    cost: 9.99,
    duration: "5-7 business days",
    value: "standard",
  },
  {
    name: "Express Delivery",
    cost: 13.99,
    duration: "2-3 business days",
    value: "express",
  },
  {
    name: "Overnight Delivery",
    cost: 19.99,
    duration: "Next business days",
    value: "overnight",
  },
];

export default function Page() {
  const form = useForm();

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
          <form>
            <div className="flex gap-10 items-start">
              <Card className="w-5/8">
                <CardHeader className="border-b border-primary/40">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Contact Information */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3">
                      <FormItem className="space-y-1">
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem className="space-y-1">
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <FormControl>
                          <Input id="phone" placeholder="+1 (555) 123-4567" />
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3">
                      <FormItem className="space-y-1">
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <FormControl>
                          <Input id="firstName" placeholder="John" />
                        </FormControl>
                      </FormItem>
                      <FormItem className="space-y-1">
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <FormControl>
                          <Input id="lastName" placeholder="Doe" />
                        </FormControl>
                      </FormItem>
                      <FormItem className="space-y-1 col-span-full">
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <FormControl>
                          <Input id="address" placeholder="123 Main Street" />
                        </FormControl>
                      </FormItem>
                      <FormItem className="space-y-1 col-span-full">
                        <FormLabel htmlFor="apartment">
                          Apartment, suite, etc. (optional)
                        </FormLabel>
                        <FormControl>
                          <Input id="apartment" placeholder="Apt 4B" />
                        </FormControl>
                      </FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full">
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="city">City</FormLabel>
                          <FormControl>
                            <Input id="city" placeholder="New York" />
                          </FormControl>
                        </FormItem>
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="state">State</FormLabel>
                          <FormControl>
                            <Input id="state" placeholder="NY" />
                          </FormControl>
                        </FormItem>
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                          <FormControl>
                            <Input id="zip" placeholder="10001" />
                          </FormControl>
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold">Shipping Method</h3>
                    <RadioGroup
                    // value={shippingMethod}
                    // onValueChange={setShippingMethod}
                    >
                      <div className="space-y-3 pl-3">
                        {shippingMethods.map(
                          ({ cost, name, duration, value }) => (
                            <FormItem key={value}>
                              <FormLabel
                                htmlFor={value}
                                className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                              >
                                <FormControl>
                                  <RadioGroupItem value={value} id={value} />
                                </FormControl>
                                <div className="flex-1 cursor-pointer">
                                  <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-0.5">
                                      <p className="font-semibold">{name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {duration}
                                      </p>
                                    </div>
                                    <span className="font-semibold">
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
                  </div>
                </CardContent>
              </Card>
              <Card className="w-3/8">
                <CardContent>
                  {/* promo code input */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter Promo Code" />
                      <Button>Apply</Button>
                    </div>
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
