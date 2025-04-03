"use client";
import React, { useState } from "react";
import { Sparkles, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { ChatHistory } from "@/components/chathistory";
import { ChatInput } from "@/components/chatinput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // 1. Add the user message to the chat history
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);

    // 2. Set loading state
    setIsLoading(true);

    try {
      // 3. Make a fetch request to the /api/chat endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();

      // 4. Add the AI response to the chat history
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch (error) {
      console.error("Error communicating with AI:", error);

      // Add an error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      // 5. Clear the loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 md:gap-4">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex items-center justify-center p-2 rounded-lg bg-primary text-primary-foreground"
          >
            <BrainCircuit className="h-6 w-6" />
          </motion.div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              InsightAI
            </h1>
            <p className="text-sm text-muted-foreground">
              Your intelligent conversation assistant
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <h2 className="text-2xl font-serif font-medium flex items-center justify-center gap-2">
            Start a Conversation <Sparkles className="h-5 w-5 text-primary" />
          </h2>
          <p className="text-muted-foreground">
            Ask questions, get information, or just chat about anything
          </p>
        </motion.div>

        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <ChatHistory messages={messages} isLoading={isLoading} />

          <div className="mt-6 mb-4">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </main>

      <footer className="py-4 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 InsightAI. Powered by Claude AI.</p>
        </div>
      </footer>
    </div>
  );
}
