
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex items-start">
      <div className="message-avatar bg-primary/10 mr-3">
        <Bot className="h-5 w-5 text-primary" />
      </div>
      <div className="typing-indicator">
        <div className="typing-dot animate-bounce"></div>
        <div className="typing-dot animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="typing-dot animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
