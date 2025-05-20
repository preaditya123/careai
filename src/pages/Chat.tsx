
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Bot, User, Upload, FileImage, FilePdf } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileType = file.type;
    const fileName = file.name;
    
    // Show upload toast notification
    toast({
      title: "File uploaded successfully",
      description: `Analyzing ${fileName}...`,
    });
    
    // Simulate processing
    setIsLoading(true);
    
    setTimeout(() => {
      let content = "";
      
      if (fileType.includes('pdf')) {
        content = `I've analyzed your PDF document "${fileName}". The document appears to contain medical information that suggests regular check-ups and proper medication management are important for your condition.`;
      } else if (fileType.includes('image')) {
        content = `I've analyzed your image "${fileName}". The image appears to show typical symptoms of a minor skin irritation. This is commonly treated with hydrocortisone cream, but please consult your doctor for a proper diagnosis.`;
      } else {
        content = `I've received your file "${fileName}" but can only analyze PDFs and images. Please upload a supported file format.`;
      }
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content },
      ]);
      
      setIsLoading(false);
    }, 2000);
    
    // Reset the input
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-background hidden lg:block">
      <Header />
      <div className="page-container py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <MessageCircle className="text-chat h-8 w-8" />
            <h1 className="page-header mb-0">Chat with Care AI</h1>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Upload Panel */}
            <div className="col-span-3">
              <Card className="border-border/50 h-full">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload medical reports, test results, or images for instant analysis.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium">Upload File</span>
                          <span className="text-xs text-muted-foreground mt-1">PDF or Image</span>
                        </div>
                        <input 
                          id="file-upload" 
                          type="file" 
                          accept="image/*,.pdf" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="justify-start" size="sm">
                        <FilePdf className="mr-2 h-4 w-4 text-report" />
                        <span>Upload PDF</span>
                      </Button>
                      <Button variant="outline" className="justify-start" size="sm">
                        <FileImage className="mr-2 h-4 w-4 text-journal" />
                        <span>Upload Image</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Chat Panel */}
            <div className="col-span-9">
              <Card className="border-border/50 h-full">
                <CardContent className="p-4 flex flex-col" style={{ height: "70vh" }}>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
