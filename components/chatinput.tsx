"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-end rounded-lg border border-border bg-card shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none bg-transparent py-3 px-4 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70"
          style={{ maxHeight: "200px" }}
        />

        <motion.button
          type="submit"
          disabled={disabled || !message.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2 mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          {disabled ? (
            <span className="flex h-5 w-5 items-center justify-center">
              <span className="animate-spin h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent" />
            </span>
          ) : (
            <Send className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {disabled && (
        <div className="absolute bottom-[-24px] left-0 right-0 flex justify-center">
          <span className="text-sm text-muted-foreground">
            AI is thinking...
          </span>
        </div>
      )}
      <div className="mt-1 ml-2">
        <span className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </span>
      </div>
    </form>
  );
}
