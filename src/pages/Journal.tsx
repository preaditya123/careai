
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Smile, Frown, Angry } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/lib/utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: string; // ISO string format
  mood: "happy" | "sad" | "angry";
};

const Journal = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<"happy" | "sad" | "angry">("happy");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { toast } = useToast();

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  // Find entry for selected date
  useEffect(() => {
    if (date instanceof Date) {
      const selectedDateStr = date.toISOString().split('T')[0];
      const foundEntry = entries.find(entry => entry.date.split('T')[0] === selectedDateStr);
      
      if (foundEntry) {
        setCurrentEntry(foundEntry);
        setTitle(foundEntry.title);
        setContent(foundEntry.content);
        setMood(foundEntry.mood);
        setIsEditing(true);
      } else {
        resetForm();
      }
    }
  }, [date, entries]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("happy");
    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const entryDate = date instanceof Date ? date : new Date();
    
    if (isEditing && currentEntry) {
      // Update existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === currentEntry.id 
          ? { ...entry, title, content, mood }
          : entry
      );
      setEntries(updatedEntries);
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated successfully.",
      });
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title,
        content,
        date: entryDate.toISOString(),
        mood,
      };
      setEntries([...entries, newEntry]);
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
    }
    resetForm();
  };

  const handleDelete = () => {
    if (currentEntry) {
      const updatedEntries = entries.filter(entry => entry.id !== currentEntry.id);
      setEntries(updatedEntries);
      resetForm();
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been deleted.",
      });
    }
  };

  // Function to get tile class names based on entries
  const getTileClassName = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split('T')[0];
    const entry = entries.find(entry => entry.date.split('T')[0] === dateStr);
    
    if (!entry) return "";
    
    return cn("relative", {
      "entry-day-happy": entry.mood === "happy",
      "entry-day-sad": entry.mood === "sad",
      "entry-day-angry": entry.mood === "angry",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-container py-12">
        <h1 className="page-header">Health Journal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="text-primary" />
                Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <style dangerouslySetInnerHTML={{ __html: `
                .react-calendar {
                  width: 100%;
                  background: transparent;
                  border: none;
                  font-family: inherit;
                  color: var(--foreground);
                }
                .react-calendar__tile {
                  padding: 1rem 0.5rem;
                }
                .react-calendar__tile--active,
                .react-calendar__tile--active:hover {
                  background: hsl(var(--primary));
                  color: hsl(var(--primary-foreground));
                }
                .react-calendar__tile--now {
                  background: hsl(var(--secondary));
                  color: hsl(var(--secondary-foreground));
                }
                .entry-day-happy::after,
                .entry-day-sad::after,
                .entry-day-angry::after {
                  content: "";
                  position: absolute;
                  bottom: 5px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                }
                .entry-day-happy::after {
                  background-color: hsl(var(--chat-color));
                }
                .entry-day-sad::after {
                  background-color: hsl(var(--report-color));
                }
                .entry-day-angry::after {
                  background-color: hsl(var(--emergency-color));
                }
              `}} />
              <Calendar 
                onChange={setDate} 
                value={date}
                tileClassName={getTileClassName}
              />
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Journal Entry" : "New Journal Entry"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    placeholder="Entry title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">How are you feeling?</label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={mood === "happy" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setMood("happy")}
                    >
                      <Smile className="mr-2" />
                      Happy
                    </Button>
                    <Button
                      type="button"
                      variant={mood === "sad" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setMood("sad")}
                    >
                      <Frown className="mr-2" />
                      Sad
                    </Button>
                    <Button
                      type="button"
                      variant={mood === "angry" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setMood("angry")}
                    >
                      <Angry className="mr-2" />
                      Frustrated
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Journal Entry</label>
                  <Textarea
                    placeholder="Write about your symptoms, feelings, or health progress..."
                    className="min-h-[150px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={handleSave}>
                    {isEditing ? "Update Entry" : "Save Entry"}
                  </Button>
                  {isEditing && (
                    <Button variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  )}
                  {isEditing && (
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Journal;
