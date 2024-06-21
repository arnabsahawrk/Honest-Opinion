"use client";
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
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader } from "lucide-react";

const VerifyAccount = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  //zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const { data: response } = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in verify of user", error);

      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Verify failed",
        description: axiosError.response?.data.message,
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
            Verify Your Account
          </h1>
          <p className="mb-4 text-xs md:text-base">
            Enter the verification code sent to your email
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              className="bg-myCustom-textSecondary text-myCustom-textPrimary"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 size-4 animate-spin" />
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default VerifyAccount;
