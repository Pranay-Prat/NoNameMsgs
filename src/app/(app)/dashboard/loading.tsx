// app/dashboard/loading.tsx
"use client"

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      {/* Glowing gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle 300px at center, rgba(34, 211, 238, 0.15), transparent 70%)",
        }}
      />

      {/* Animated Loader */}
      <motion.div
        className="flex items-center justify-center space-x-4 z-10"
        initial={{ opacity: 0, y: "20%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="text-lg md:text-xl font-medium text-cyan-100">
          Loading Dashboard...
        </span>
      </motion.div>
    </div>
  )
}
