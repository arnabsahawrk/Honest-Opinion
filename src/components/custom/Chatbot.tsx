import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiMessageSchema } from "@/schemas/AiMessageSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

type CounterProps = {
  setAiMessage: React.Dispatch<React.SetStateAction<string>>;
};

const Chatbot = ({ setAiMessage }: CounterProps) => {
  const [geminiMessage, setGeminiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  //zod resolver
  const form = useForm<z.infer<typeof AiMessageSchema>>({
    resolver: zodResolver(AiMessageSchema),
  });

  const onSubmit = async (data: z.infer<typeof AiMessageSchema>) => {};

  return (
    <div className="flex flex-col items-center gap-2 my-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full text-center"
        >
          <FormField
            name="aiMessage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Get your opinion by asking AI...."
                    className="text-myCustom-textSecondary font-semibold tracking-widest bg-none focus-visible:ring-0 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            onClick={() => setAiMessage("fadf")}
            className="bg-myCustom-textPrimary text-myCustom-textSecondary font-semibold hover:bg-myCustom-textPrimary hover:scale-95 transition duration-300"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 size-4 animate-spin" />
              </>
            ) : (
              "Ask AI"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Chatbot;
