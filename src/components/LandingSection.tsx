"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import Link from "next/link";
import LinkBox from "./LinkBox"; // Adjust the import path as needed

export function LandingSection() {

  
  return (
    <LampContainer>
      <Link href="/signup">
        <motion.h1
          initial={{
            opacity: 0.3,
            y: 150,
            color: "#9ca3af",
            filter: "brightness(0.7)",
            textShadow: "none",
          }}
          whileInView={{
            opacity: 1,
            y: 90,
            color: "#ffffff",
            filter: "brightness(1.2)",
            textShadow: "0 0 8px rgba(255,255,255,0.5)",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="cursor-pointer text-center text-4xl font-extrabold tracking-tight md:text-7xl"
        >
          No Name <br /> Msgs
        </motion.h1>
      </Link>

      {/* Subtitle that animates in with the title */}
      <motion.p
        initial={{
          opacity: 0,
          y: 120,
        }}
        whileInView={{
          opacity: 0.8,
          y: 60,
        }}
        transition={{
          delay: 0.6,
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="mt-16 mb-20 text-center text-lg text-gray-300 md:text-xl max-w-2xl px-4"
      >
        Share anonymous messages with anyone, anywhere
      </motion.p>

      {/* LinkBox component - animates in after everything else */}
      <LinkBox />
    </LampContainer>
  );
}