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
        y: 60,
        zIndex: 100
      }}
      transition={{
        delay: 1.4, // Starts after lamp animation (0.3 + 0.8 + 0.3 buffer)
        duration: 0.6,
        ease: "easeOut"
      }}
      className="bg-gradient-to-r from-purple-600 to-blue-500 p-[2px] rounded-md shadow-md w-full max-w-4xl relative"
    >
      <div className="flex bg-white rounded-md overflow-hidden">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste link here"
          className="flex-1 px-4 py-2 outline-none text-gray-700"
        />
        <button
          onClick={handlePaste}
          className="px-3 py-2 border-l border-gray-200 hover:bg-gray-100 text-sm font-medium text-gray-600 flex items-center gap-1"
        >
          <ClipboardPaste className="h-4 w-4" />
          Paste
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gradient-to-r from-pink-600 to-red-500 text-white hover:brightness-110 transition-all"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default LinkBox;