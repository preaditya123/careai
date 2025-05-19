
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Bot, User } from "lucide-react";

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
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
      <div className="page-container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <MessageCircle className="text-chat h-8 w-8" />
            <h1 className="page-header mb-0">Chat with Care AI</h1>
          </div>
          
          <Card className="mb-4 border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Ask any health-related questions and get reliable responses powered by RAG technology.
                Your conversations are private and secure.
              </p>
            </CardContent>
          </Card>

          <div className="bg-card rounded-lg border border-border/50 h-[60vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-muted rounded-tr-lg rounded-br-lg rounded-bl-lg"
                        : "bg-primary rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                    } p-3`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {message.role === "assistant" ? (
                          <Bot size={18} />
                        ) : (
                          <User size={18} />
                        )}
                      </div>
                      <span className="text-sm">{message.content}</span>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                    <Bot size={18} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-border flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health question..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="mt-4 text-xs text-muted-foreground text-center">
            The responses are simulated for demonstration purposes. In a production environment, 
            this would connect to the Perplexity Sonar API for real medical information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
