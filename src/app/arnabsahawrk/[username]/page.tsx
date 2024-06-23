"use client";

import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const AnonymousMessage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  //zod implementation
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      const { data: response } = await axios.post("/api/send-message", {
        username: params.username,
        content: data.content,
      });

      toast({
        title: "Success",
        description: response.message,
      });
    } catch (error) {
      console.error("Error in send message", error);

      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="text-myCustom-textPrimary bg-myCustom-bgSecondary ">
      <section className="container mx-auto px-4 md:px-24 py-12 min-h-screen">
        <h1 className="text-center font-bold text-3xl">Public Profile Link</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Send Anonymous Message to @{params.username}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your opinion here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              className="bg-myCustom-textPrimary text-myCustom-textSecondary font-semibold hover:bg-myCustom-textPrimary hover:scale-95 transition duration-300"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 size-4 animate-spin" />
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-32">
          <p className="mb-2 text-lg">Get Your Message Board</p>
          <Link href="/sign-up">
            <Button className="bg-myCustom-textPrimary text-myCustom-textSecondary font-semibold hover:bg-myCustom-textPrimary hover:scale-95 transition duration-300">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AnonymousMessage;
