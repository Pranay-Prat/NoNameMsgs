// components/LinkBox.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ClipboardPaste, ArrowRight } from 'lucide-react';

const LinkBox = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Clipboard read failed:', err);
    }
  };

  const handleSubmit = () => {
    if (!url.trim()) return;
    const username = url.trim().split('/').pop();
    if (username) {
      router.push(`/u/${username}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        zIndex: -10
      }}
      animate={{
        opacity: 1,
        y: 0,
        zIndex: 100
      }}
      transition={{
        delay: 0,
        duration: 0.6,
        ease: "easeOut"
      }}
      className="
        bg-gradient-to-r from-purple-600 to-blue-500 p-[2px] rounded-md shadow-md
        w-full max-w-sm sm:max-w-md md:max-w-lg {/* Adjusted max-width values */}
      "
    >
      <div className="flex bg-white rounded-md overflow-hidden">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste link here"
          className="flex-1 px-3 py-2 sm:px-4 sm:py-3 outline-none text-gray-700 text-sm sm:text-base"
        />
        <button
          onClick={handlePaste}
          className="
            px-2 py-1 sm:px-3 sm:py-2
            border-l border-gray-200
            hover:bg-gray-100
            text-xs sm:text-sm font-medium text-gray-600
            flex items-center gap-1
          "
        >
          <ClipboardPaste className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Paste</span>
        </button>
        <button
          onClick={handleSubmit}
          className="
            px-3 py-2 sm:px-4 sm:py-3
            bg-gradient-to-r from-pink-600 to-red-500
            text-white hover:brightness-110 transition-all
            flex items-center justify-center
          "
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default LinkBox;