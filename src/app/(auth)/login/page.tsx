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
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm();

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
            <form className="space-y-4">
              <FormItem className="space-y-1">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormItem className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      //   value={email}
                      //   onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </FormControl>
                </FormItem>
              </FormItem>

              <FormItem className="space-y-1">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormItem className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      id="password"
                      //   type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      //   value={password}
                      //   onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                  </FormControl>
                  <button
                    type="button"
                    //   onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {true ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </FormItem>
              </FormItem>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Sign In
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
