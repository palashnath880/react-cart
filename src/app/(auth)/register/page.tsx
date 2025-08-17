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
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  // react-hook-form
  const form = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md bg-white/40">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up for a new account to get started
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
              <div className="grid grid-cols-2 gap-4">
                {/* first name */}
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormItem className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10"
                        required
                      />
                    </FormControl>
                  </FormItem>
                </FormItem>

                {/* last name */}
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormItem className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="pl-10"
                        required
                      />
                    </FormControl>
                  </FormItem>
                </FormItem>
              </div>

              <FormItem className="space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormItem className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="pl-10"
                      required
                    />
                  </FormControl>
                </FormItem>
              </FormItem>

              <FormItem className="space-y-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormItem className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      id="password"
                      //   type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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

              <FormItem className="space-y-2">
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormItem className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      //   type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      //   value={formData.confirmPassword}
                      //   onChange={(e) =>
                      //     handleInputChange("confirmPassword", e.target.value)
                      //   }
                      className="pl-10 pr-10"
                      required
                    />
                  </FormControl>
                  <button
                    type="button"
                    //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    id="terms"
                    // checked={formData.agreeToTerms}
                    // onCheckedChange={(checked) =>
                    //   handleInputChange("agreeToTerms", checked as boolean)
                    // }
                  />
                </FormControl>
                <FormLabel htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
              </FormItem>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                //   disabled={!formData.agreeToTerms}
              >
                Create Account
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
