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
import { IRegisterInputs, registerFormSchema } from "@/schemas/register.schema";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  // password show/hide state
  const [isShow, setIsShow] = useState({
    pwd: false,
    conPwd: false,
  });

  // useRouter hook
  const router = useRouter();

  // react-hook-form
  const form = useForm<IRegisterInputs>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { isAgree: false },
  });

  // isAgree
  const { isAgree } = useWatch({ control: form.control });

  // register handler
  const registerHandler = async (data: IRegisterInputs) => {
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      // if request is failed
      if (!res.ok)
        throw new Error(resData.message || "Sorry! Something went wrong.");

      // reset form data
      form.reset();

      // success toast
      toast.success("You’ve registered successfully!", {
        description: "Please check your email to verify your account.",
      });

      // replace register route
      router.replace("/login");
    } catch (err: unknown) {
      form.setError("root", {
        message:
          err instanceof Error ? err.message : "Sorry! Something went wrong.",
        type: "manual",
      });
    }
  };

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
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(registerHandler)}
            >
              <div className="grid grid-cols-2 gap-4">
                {/* first name */}
                <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel htmlFor={field.name}>First Name</FormLabel>
                      <FormItem className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            id={field.name}
                            placeholder="John"
                            className={`pl-10`}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* last name */}
                <FormField
                  control={form.control}
                  name="lname"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel htmlFor={field.name}>Last Name</FormLabel>
                      <FormItem className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            id={field.name}
                            placeholder="Doe"
                            className={`pl-10`}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor={field.name}>Email</FormLabel>
                    <FormItem className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="john.doe@example.com"
                          className={`pl-10`}
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
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor={field.name}>Password</FormLabel>
                    <FormItem className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          type={isShow.pwd ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setIsShow((prev) => ({ ...prev, pwd: !prev.pwd }))
                        }
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {isShow.pwd ? (
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

              {/* confirm password field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor={field.name}>Confirm Password</FormLabel>
                    <FormItem className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          type={isShow.conPwd ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setIsShow((prev) => ({
                            ...prev,
                            conPwd: !prev.conPwd,
                          }))
                        }
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {isShow.conPwd ? (
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

              {/* agree terms */}
              <FormField
                control={form.control}
                name="isAgree"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={(val) => field.onChange(val)}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={field.name}
                      className="text-sm cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
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
                )}
              />

              {/* form root error */}
              {form.formState.errors["root"] && (
                <p className="text-center text-sm text-red-400">
                  {form.formState.errors["root"].message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={!isAgree || form.formState.isSubmitting}
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
