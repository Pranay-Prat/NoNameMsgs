// app/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LinkBox from "../components/LinkBox"; // Adjust the import path as needed

// The new background component you provided, now including the Framer Motion blobs
const IndigoCosmosBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative bg-black">
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

      {/* Main Content/Components - Ensure they are above the background */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default function LandingSection() { // Renamed from LandingSection for clarity as it's the main page
  return (
    <IndigoCosmosBackground>
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          text-center
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-extrabold tracking-tight
          text-white
          mb-4 sm:mb-6 md:mb-8
        "
      >
        No Name <br className="sm:hidden"/> Msgs
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="
          text-center
          text-base sm:text-lg md:text-xl
          text-gray-300
          max-w-md sm:max-w-lg md:max-w-xl
          mb-8 sm:mb-10 md:mb-12
          px-4
        "
      >
        Share anonymous messages with anyone, anywhere.
        Get honest feedback without revealing identity.
      </motion.p>

      {/* LinkBox Component */}
      <motion.div
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
         className="w-full flex justify-center px-4"
      >
        <LinkBox />
      </motion.div>


      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        className="mt-10 sm:mt-12 md:mt-14"
      >
        <Link href="/signup">
          <button
            className="
              px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4
              bg-gradient-to-r from-purple-700 to-indigo-600
              text-white
              font-bold
              rounded-full
              shadow-lg
              hover:from-purple-800 hover:to-indigo-700
              transition-all duration-300 ease-in-out
              text-base sm:text-lg md:text-xl
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900
            "
          >
            Get Started
          </button>
        </Link>
      </motion.div>

    </IndigoCosmosBackground>
  );
}

// components/LinkBox.tsx remains exactly the same as in the previous response
// as its changes were independent of the background component.