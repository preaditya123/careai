
import { MessageCircle } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="bg-primary/10 p-2.5 rounded-full mr-3">
        <MessageCircle className="text-primary h-6 w-6" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Care AI Assistant</h1>
        <p className="text-sm text-muted-foreground">Your personal healthcare companion</p>
      </div>
    </div>
  );
};

export default ChatHeader;
