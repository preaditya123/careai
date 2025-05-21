
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ChatMessage from "@/components/chat/ChatMessage";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI healthcare assistant. How can I help you with your health questions today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "Based on the latest medical research, it's recommended to maintain a balanced diet rich in fruits, vegetables, and whole grains to support your immune system.",
        "Regular exercise, typically 150 minutes of moderate activity per week, is beneficial for cardiovascular health and stress management.",
        "Your symptoms might suggest a common cold, but if fever persists for more than 3 days, consulting with a healthcare provider is recommended.",
        "Staying hydrated is crucial for overall health. The recommended daily water intake is about 3.7 liters for men and 2.7 liters for women.",
        "Sleep plays a vital role in physical health and emotional wellbeing. Adults should aim for 7-9 hours of quality sleep each night.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="chat-container">
        <ChatHeader />
        
        <ScrollArea className="chat-messages">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {isLoading && <TypingIndicator />}
        </ScrollArea>
        
        <ChatInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={() => handleSendMessage(input)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatPage;
