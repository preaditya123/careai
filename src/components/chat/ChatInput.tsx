
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isLoading: boolean;
}

const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-4xl mx-auto">
        <Input
          value={value}
          onChange={onChange}
          placeholder="Type your health question..."
          className="flex-1 bg-card border-border/50 focus-visible:ring-primary/30 shadow-sm"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !value.trim()}
          className="rounded-full w-10 h-10 flex-shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
