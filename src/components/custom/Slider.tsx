"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import { Mail } from "lucide-react";

const Slider = () => {
  return (
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
                    <Mail /> {message.received}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
