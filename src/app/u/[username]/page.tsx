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
import { Poppins } from "next/font/google"; // Import Poppins font

// Define Poppins font
const poppins = Poppins({
  weight: ["400", "700"],
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
    <div className="min-h-screen w-full relative bg-black"> {/* Main container with background */}
      {/* Indigo Cosmos Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Framer Motion animated background elements (blobs) */}
      <motion.div
        initial={{ x: -100, y: -100, scale: 0.8, opacity: 0.2 }}
        animate={{
          x: [0, 30, -20, 0], // Move right, then left, then back
          y: [0, -50, 20, 0], // Move up, then down, then back
          scale: [0.8, 1.1, 0.9, 0.8], // Scale up, then down, then back
          opacity: [0.2, 0.3, 0.15, 0.2], // Subtle opacity changes
        }}
        transition={{
          duration: 15, // Longer duration for subtle movement
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5, // Stagger initial appearance
        }}
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
      ></motion.div>

      <motion.div
        initial={{ x: 100, y: 100, scale: 0.8, opacity: 0.2 }}
        animate={{
          x: [0, -40, 10, 0], // Move left, then right, then back
          y: [0, 30, -60, 0], // Move down, then up, then back
          scale: [0.8, 0.9, 1.1, 0.8], // Scale down, then up, then back
          opacity: [0.2, 0.15, 0.3, 0.2], // Subtle opacity changes
        }}
        transition={{
          duration: 18, // Different duration for varied movement
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1.5, // Stagger initial appearance
        }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
      ></motion.div>

      {/* Actual content with readable colors, placed relative to the background */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 w-full flex flex-col items-center justify-center min-h-screen">
        {/* Animated Heading - Using Poppins font */}
        <motion.h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center text-white flex justify-center flex-wrap gap-2 ${poppins.className}`}
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
          {"Send A Message".split(" ").map((word, idx) => (
            <motion.span
              key={idx}
              variants={{
                hidden: { opacity: 0, y: -40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Added a description for clarity */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-gray-300 text-lg mb-8"
        >
          To <span className="font-semibold text-white">@{username}</span>
        </motion.p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full"> {/* Added w-full here for form to respect max-width */}
            <Controller
              name="content"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel className="text-white text-center block mb-2">
                    Write your anonymous message below
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
                <Button disabled className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !form.watch("content")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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