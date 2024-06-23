"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { IMessage } from "@/model/User";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: IMessage;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    onMessageDelete(message._id as string);
    const { data } = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );

    toast({
      title: data.message,
    });
  };

  return (
    <Card className="bg-myCustom-textPrimary">
      <CardHeader className="p-1">
        <AlertDialog>
          <AlertDialogTrigger
            asChild
            className="translate-y-[-40%] translate-x-[-50%]"
          >
            <Button variant="destructive" className="size-fit p-2">
              <X className="text-myCustom-textPrimary size-6" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-myCustom-textPrimary">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-myCustom-bgPrimary">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-myCustom-textSecondary font-semibold">
                This action cannot be undone. This will permanently delete this
                message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-myCustom-textSecondary text-myCustom-textPrimary"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-justify text-myCustom-textSecondary text-xl font-semibold">
          <p>{message.content}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <p>{new Date(message.createdAt).toLocaleString()}</p>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
