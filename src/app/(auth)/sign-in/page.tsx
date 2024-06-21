"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        toast({
          title: "Sign In Failed",
          description: "Incorrect identity",
          variant: "destructive",
        });
      }

      if (result?.url) {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Error in sign in of user", error);

      toast({
        title: "Sign In failed",
        description: "Sign In failed from database",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex justify-center items-center min-h-screen bg-myCustom-bgPrimary px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-myCustom-textPrimary rounded-lg shadow-md">
        <div className="text-center text-myCustom-textSecondary">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
            Welcome Back To Honest Opinion
          </h1>
          <p className="mb-4 text-xs md:text-base">
            Sign in to continue your secret conversations
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* email  */}
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-myCustom-textSecondary">
                    Username/Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Username/Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password  */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-myCustom-textSecondary">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={`${showPassword ? "text" : "password"}`}
                        placeholder="Password"
                        {...field}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 bottom-2.5 cursor-pointer"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* sign up */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-myCustom-textSecondary text-myCustom-textPrimary w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 size-4 animate-spin" />
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4 text-myCustom-textSecondary">
          <p>
            Not have an account?
            <Link
              href="/sign-up"
              className="text-myCustom-bgPrimary hover:text-opacity-80 font-bold"
            >
              &nbsp;Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
