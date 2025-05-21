
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      <div className="flex flex-col h-[calc(100vh-64px)] max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="bg-primary/10 p-2.5 rounded-full mr-3">
            <MessageCircle className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Care AI Assistant</h1>
        </div>
        
        <Card className="flex-1 border-border/30 shadow-sm bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
          <CardContent className="flex flex-col h-full p-0">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start",
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="bg-primary/10 p-1.5 rounded-full mr-3 flex-shrink-0">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-3 rounded-2xl",
                        message.role === "assistant"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="bg-primary p-1.5 rounded-full ml-3 flex-shrink-0">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-1.5 rounded-full mr-3 flex-shrink-0">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-muted px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="border-t border-border/30 p-4 bg-background/50 backdrop-blur-sm">
              <form
                onSubmit={handleSendMessage}
                className="flex gap-2 items-center"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your health question..."
                  className="flex-1 bg-card border-border/50 focus-visible:ring-primary/30"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input.trim()}
                  className="rounded-full w-10 h-10 flex-shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
