"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";

import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Hanalei_Fill } from "next/font/google";

const hanalei = Hanalei_Fill({
  weight: "400",
  subsets: ["latin"],
});

const SendMessage = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/send-messages", {
        content: data.content,
        username,
      });

      toast.success("Message sent successfully");
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const placeholders = [
    "Say something kind anonymously!",
    "What's on your mind?",
    "Leave a thoughtful message!",
    "Speak freely, you're anonymous.",
    "Any confessions or compliments?",
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 30%, #17183A 100%)",
        }}
      />

      {/* Actual content with readable colors */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">
        {/* Animated Heading */}
        <motion.h1
  className={`text-7xl font-bold mb-6 text-center text-black flex justify-center flex-wrap gap-2 ${hanalei.className}`}
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  }}
>
  {"No Name Msgs".split(" ").map((word, idx) => (
    <motion.span
      key={idx}
      variants={{
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {word}
    </motion.span>
  ))}
</motion.h1>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="content"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel className="text-black text-center block mt-12 mb-2">
                    Write a short anonymous message
                  </FormLabel>
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={(e) => form.setValue("content", e.target.value)}
                    onSubmit={(val) => {
                      form.setValue("content", val);
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !form.watch("content")}
                >
                  Send It
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SendMessage;
