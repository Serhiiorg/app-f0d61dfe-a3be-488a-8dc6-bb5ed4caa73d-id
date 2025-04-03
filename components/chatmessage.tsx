"use client";
import React from "react";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[80%] items-start gap-2`}
      >
        <div
          className={`
          flex justify-center items-center h-8 w-8 shrink-0 rounded-full
          ${isUser ? "bg-primary-100" : "bg-secondary-100"}
        `}
        >
          {isUser ? (
            <User className="h-4 w-4 text-primary-600" />
          ) : (
            <Bot className="h-4 w-4 text-secondary-800" />
          )}
        </div>

        <div
          className={`
          rounded-lg px-4 py-2 shadow-sm
          ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-card text-card-foreground rounded-tl-none border border-border"
          }
          ${isLoading ? "animate-pulse" : ""}
        `}
        >
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <div
                className="h-2 w-2 rounded-full bg-current animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="h-2 w-2 rounded-full bg-current animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="h-2 w-2 rounded-full bg-current animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
