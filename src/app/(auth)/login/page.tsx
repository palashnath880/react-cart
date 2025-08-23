"use client";

import SocialAuth from "@/components/shared/SocialAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ILoginInputs, loginFormSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  // password hide/show state
  const [isShow, setIsShow] = useState<boolean>(false);

  // useRouter hook
  const router = useRouter();

  // react-hook-form
  const form = useForm<ILoginInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  // login handler
  const loginHandler = async (data: ILoginInputs) => {
    try {
      // fetch request
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();

      // if request is failed
      if (!res.ok) {
        throw new Error(resData.message || "Sorry! Something went wrong.");
      }

      router.replace("/my-account"); // redirect to my-account page
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sorry! Something went wrong.";
      form.setError("root", { message, type: "manual" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <Card className="w-full max-w-md bg-white/80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SocialAuth />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(loginHandler)}
            >
              {/* email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor={field.name}>Email</FormLabel>
                    <FormItem className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="Enter your email"
                          className="pl-10"
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor={field.name}>Password</FormLabel>
                    <FormItem className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          type={isShow ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setIsShow(!isShow)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {isShow ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* form root error */}
              {form.formState.errors["root"] && (
                <p className="text-center text-sm text-red-400">
                  {form.formState.errors["root"].message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
