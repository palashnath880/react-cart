"use client";

import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import {
  IProfileUpdateInputs,
  profileUpdateSchema,
} from "@/schemas/profile.schema";
import useAuthStore from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  // auth store
  const { loading, user, update } = useAuthStore((state) => state);

  // react-hook-form
  const form = useForm<IProfileUpdateInputs>({
    resolver: zodResolver(profileUpdateSchema),
  });

  // update form values
  useEffect(() => {
    if (user) {
      form.setValue("displayName", user.user_metadata?.displayName);
      user?.email && form?.setValue("email", user.email);
      user?.phone && form?.setValue("phone", user.phone);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card
        className={`relative ${
          loading &&
          'after:content-[""] after:w-full after:bg-white/30 after:h-full after:absolute after:top-0 after:left-0 after:backdrop-blur-xs'
        }`}
      >
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(update)}>
              {/* display name */}
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor={field.name}>
                      Email
                      {/* verified badge */}
                      {user?.email_confirmed_at && (
                        <Badge className="rounded-full">Verified</Badge>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        {...field}
                        id={field.name}
                        placeholder="john.doe@example.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor={field.name}>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="+1 (555) 123-4567"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                Save Changes
              </Button>
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
