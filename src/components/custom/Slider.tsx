"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { IMessage } from "@/model/User";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Skeleton } from "@/components/ui/skeleton";

const Slider = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<ApiResponse>("/api/get-all-messages");
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to fetch all messages", error);

      const axiosError = error as AxiosError<ApiResponse>;
      console.error(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          orientation="vertical"
          className="w-full max-w-xs"
        >
          <CarouselContent className="-mt-1 h-[200px]">
            {messages.map((message, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <div className="p-1">
                  <Card className="bg-myCustom-textPrimary text-myCustom-textSecondary">
                    <CardContent className="flex flex-col items-center justify-center gap-1 p-6 text-center">
                      <span className="text-lg font-semibold">
                        {message.content.split(" ").slice(0, 7).join(" ") +
                          (message.content.split(" ").length > 7 ? "..." : "")}
                      </span>
                      <span className="text-xs flex items-center gap-2">
                        <Mail /> {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
};

export default Slider;
