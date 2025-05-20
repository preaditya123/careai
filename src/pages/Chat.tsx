
import { useState, useRef } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Bot, User, Upload, FileImage, FileText, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FileInfo {
  name: string;
  type: string;
  size: number;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
const MAX_FILES = 5;

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI healthcare assistant. How can I help you with your health questions today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const validateFileUpload = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds the maximum limit of 100MB`;
    }
    
    if (uploadedFiles.length >= MAX_FILES) {
      return `You can only upload up to ${MAX_FILES} files`;
    }
    
    const fileType = file.type;
    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      return `Only PDF and image files are supported`;
    }
    
    return null;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file
    const validationError = validateFileUpload(file);
    if (validationError) {
      toast({
        title: "Upload Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }
    
    const fileInfo: FileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
    };
    
    // Add file to uploaded files
    setUploadedFiles(prev => [...prev, fileInfo]);
    
    // Show upload toast notification
    toast({
      title: "File uploaded successfully",
      description: `${file.name} added to queue`,
    });
    
    // Reset the input
    e.target.value = '';
  };
  
  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  const analyzeFiles = () => {
    // Only proceed if there are files to analyze
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload at least one file first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing of all uploaded files
    setTimeout(() => {
      let content = "I've analyzed your uploaded files:";
      
      uploadedFiles.forEach(file => {
        if (file.type.includes('pdf')) {
          content += `\n\n• The PDF document "${file.name}" appears to contain medical information that suggests regular check-ups and proper medication management are important for your condition.`;
        } else if (file.type.includes('image')) {
          content += `\n\n• The image "${file.name}" shows typical symptoms of a minor skin irritation. This is commonly treated with hydrocortisone cream, but please consult your doctor for a proper diagnosis.`;
        }
      });
      
      content += "\n\nOverall assessment: Your documents indicate that you should maintain your current treatment plan while monitoring for any changes in symptoms. A follow-up appointment in 2-3 weeks is recommended.";
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content },
      ]);
      
      setIsLoading(false);
    }, 2000);
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
                    <span className="block mt-1 text-xs">
                      Max: 100MB per file, up to 5 files
                    </span>
                  </p>
                  
                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={triggerFileUpload}
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium">Upload File</span>
                          <span className="text-xs text-muted-foreground mt-1">PDF or Image</span>
                        </div>
                        <input 
                          ref={fileInputRef}
                          id="file-upload" 
                          type="file" 
                          accept="image/*,.pdf" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}/{MAX_FILES})</h4>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md text-xs">
                              <div className="flex items-center gap-2 overflow-hidden">
                                {file.type.includes('pdf') ? 
                                  <FileText className="h-4 w-4 text-report flex-shrink-0" /> : 
                                  <FileImage className="h-4 w-4 text-journal flex-shrink-0" />
                                }
                                <span className="truncate">{file.name}</span>
                                <span className="text-muted-foreground flex-shrink-0">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-5 w-5 p-0" 
                                onClick={() => handleRemoveFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {uploadedFiles.length > 0 && (
                      <Button 
                        onClick={analyzeFiles}
                        className="w-full" 
                        disabled={isLoading}
                      >
                        Analyze Files
                      </Button>
                    )}
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
                          <div className="flex items-center space-x-1 ml-2">
                            <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
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
