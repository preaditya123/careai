
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="message-avatar bg-primary/10 mr-3">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          "message-bubble",
          isUser ? "user-message" : "assistant-message"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      
      {isUser && (
        <div className="message-avatar bg-primary ml-3">
          <User className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
