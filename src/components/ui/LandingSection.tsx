"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import Link from "next/link";
export function LandingSection() {
  return (
    <LampContainer>
    <Link href="/signup">
        <motion.h1
          initial={{
            opacity: 0.3,
            y: 100,
            color: "#9ca3af",
            filter: "brightness(0.7)",
            textShadow: "none",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            color: "#ffffff",
            filter: "brightness(1.2)",
            textShadow: "0 0 8px rgba(255,255,255,0.5)",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-6 cursor-pointer text-center text-4xl font-extrabold tracking-tight md:text-7xl"
        >
          No Name <br /> Msgs
        </motion.h1>
      </Link>

    </LampContainer>
  );
}
