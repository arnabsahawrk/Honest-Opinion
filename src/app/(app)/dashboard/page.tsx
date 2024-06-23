"use client";

import MessageCard from "@/components/custom/MessageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { IMessage } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import loadingImage from "../../icon.png";

const Dashboard = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const { data } = await axios.get<ApiResponse>("/api/accept-messages");

      setValue("acceptMessages", data.isAcceptingMessages);
    } catch (error) {
      console.error("Failed to fetch message settings", error);

      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);

      try {
        const { data } = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        console.error("Failed to fetch latest messages", error);

        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch latest messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [toast, setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessage();

    // Set profile URL only on the client side
    if (typeof window !== "undefined") {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const username = session.user.username;
      setProfileUrl(`${baseUrl}/arnabsahawrk/${username}`);
    }
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  //handle switch change
  const handleSwitchChange = async () => {
    try {
      const { data } = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast({
        title: "Status",
        description: data.message,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to update accept message setting", error);

      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to update accept message setting",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);

    toast({
      title: "URL copied",
      description: "Profile URL has been copied to clipboard",
      variant: "default",
    });
  };

  if (!session || !session.user) {
    return (
      <main className="w-screen min-h-[calc(100vh-128px)] flex flex-col justify-center items-center bg-myCustom-textPrimary">
        <Image
          src={loadingImage}
          alt="loading"
          width="100"
          height="100"
          className="object-fit animate-bounce"
        />
      </main>
    );
  }

  return (
    <main className="text-myCustom-textPrimary bg-myCustom-bgPrimary min-h-[calc(100vh-128px)]">
      <section className="mx-auto p-6  container ">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Dashboard</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={profileUrl}
              readOnly
              className="text-myCustom-textSecondary font-semibold tracking-widest bg-none focus-visible:ring-0"
            />
            <Button
              className="bg-myCustom-textPrimary text-myCustom-textSecondary font-semibold hover:bg-myCustom-textPrimary hover:scale-95 transition duration-300"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            Accept Messages: {acceptMessages ? "On" : "Off"}
          </span>
        </div>
        <Separator />

        <Button
          className="mt-4"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <RefreshCcw className="size-4 text-myCustom-textSecondary" />
          )}
        </Button>

        <div
          className={`mt-4 ${
            messages.length > 0
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "text-center"
          }`}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={index}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p className="text-xl font-semibold tracking-widest">
              No messages found to display
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
