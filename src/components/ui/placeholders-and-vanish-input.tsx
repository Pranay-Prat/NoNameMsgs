"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value.trim());
        setValue("");
      }
    }
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow px-4 pt-3 pb-2 transition duration-200">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          rows={2}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full resize-none text-sm sm:text-base border-none bg-transparent rounded-xl pr-4 dark:text-white text-black",
            "max-h-[200px] overflow-y-auto focus:outline-none"
          )}
          placeholder=""
          style={{ lineHeight: "1.5" }}
        />

        {/* Placeholder */}
        <div className="absolute top-0 left-0 pt-1 pl-1 pointer-events-none">
          <AnimatePresence mode="wait">
            {!value && (
              <motion.p
                key={`current-placeholder-${currentPlaceholder}`}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="dark:text-zinc-500 text-sm sm:text-base text-neutral-500"
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit icon like ChatGPT – below and right aligned */}
      <div className="flex justify-end pt-2">
        <button
          disabled={!value.trim()}
          type="button"
          onClick={handleSubmit}
          className="h-9 w-9 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <motion.path
              d="M5 12l14 0"
              initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
              animate={{ strokeDashoffset: value ? 0 : "50%" }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}
