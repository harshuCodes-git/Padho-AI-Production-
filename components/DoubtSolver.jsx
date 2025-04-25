"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { askGemini } from "@/actions/doubt-solver";
import { Loader2, Send } from "lucide-react";

export function DoubtSolver() {
  const [doubt, setDoubt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doubt.trim()) return;

    const userMessage = { role: "user", content: doubt };
    setMessages((prev) => [...prev, userMessage]);

    setDoubt("");
    setIsLoading(true);

    try {
      const response = await askGemini(doubt);
      const aiMessage = { role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: `Error: ${
          error instanceof Error
            ? error.message
            : "Failed to get response from Gemini AI. Please try again later."
        }`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col h-[calc(100vh-4rem)] max-h-screen p-4">
      {/* Scrollable Chat Box */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-4 overflow-y-auto pr-2 mb-28"
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Card
              key={index}
              className={`${
                message.role === "assistant" ? "bg-muted" : "bg-card"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <div className="font-semibold min-w-[80px]">
                    {message.role === "user" ? "You:" : "Padho AI:"}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12">
            Ask your first question to get started
          </div>
        )}

        {isLoading && (
          <Card className="bg-muted">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="font-semibold min-w-[80px]">Padho AI:</div>
                <Loader2 className="h-4 w-4 animate-spin" />
                <div>Thinking...</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Input Box */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-10 right-10 bg-background border-t border-muted p-8 flex flex-col gap-2"
      >
        <Textarea
          placeholder="Ask your doubt here..."
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          className="min-h-[50px] resize-none"
        />
        <Button
          type="submit"
          className="self-end"
          disabled={isLoading || !doubt.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
