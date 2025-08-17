"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <FormItem className="space-y-2">
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <FormControl>
                  <Input id="firstName" defaultValue="John" />
                </FormControl>
              </FormItem>
              <FormItem className="space-y-2">
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <FormControl>
                  <Input id="lastName" defaultValue="Doe" />
                </FormControl>
              </FormItem>
              <FormItem className="space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                  />
                </FormControl>
              </FormItem>
              <FormItem className="space-y-2">
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <FormControl>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </FormControl>
              </FormItem>
              <Button className="cursor-pointer">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Orders
              </span>
              <span className="font-semibold text-gray-700">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Spent</span>
              <span className="font-semibold text-gray-700">$1,247.80</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Wishlist Items
              </span>
              <span className="font-semibold text-gray-700">{20}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Member Since
              </span>
              <span className="font-semibold text-gray-700">Jan 2024</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Loyalty Status
              </span>
              <Badge className="bg-primary">Gold Member</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
