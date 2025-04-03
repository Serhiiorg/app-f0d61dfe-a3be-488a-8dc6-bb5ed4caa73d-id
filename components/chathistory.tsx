"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatMessage } from "@/components/chatmessage";

interface ChatHistoryProps {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  isLoading?: boolean;
}

export function ChatHistory({ messages, isLoading = false }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-[500px] overflow-y-auto px-4 py-6 rounded-lg bg-background">
      {messages.length === 0 ? (
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted text-center max-w-md">
            Start a conversation with the AI assistant. Type your message below
            and press Enter to send.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <ChatMessage
              message={{ role: "assistant", content: "" }}
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
