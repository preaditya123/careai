
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import { MessageCircle, FileText, Ambulance, Stethoscope, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-container py-12">
        {/* Hero Section */}
        <div className="hero-section text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Your Complete <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Healthcare AI</span> Companion
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Care AI provides personalized health assistance, medical report analysis, 
            emergency services, health predictions, and personal health journaling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/chat">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link to="/journal">Track Your Health</Link>
            </Button>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8 mt-16">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* Chat with Care AI */}
          <FeatureCard
            title="Chat with Care AI"
            description="Get reliable answers to your health questions from our comprehensive medical knowledge base and AI-powered assistant."
            icon={<MessageCircle className="w-8 h-8 text-chat" />}
            iconColor="bg-chat/10"
            to="/chat"
          />
          
          {/* Report Analysis */}
          <FeatureCard
            title="Report Analysis"
            description="Upload your medical reports and receive instant interpretations with clear insights and guidance based on your health documents."
            icon={<FileText className="w-8 h-8 text-report" />}
            iconColor="bg-report/10"
            to="/report-analysis"
          />
          
          {/* Emergency Assistant */}
          <FeatureCard
            title="Emergency Assistant"
            description="Access emergency services with location tracking and instant hospital notifications for immediate medical assistance."
            icon={<Ambulance className="w-8 h-8 text-emergency" />}
            iconColor="bg-emergency/10"
            to="/emergency"
          />
          
          {/* Disease Prediction */}
          <FeatureCard
            title="Disease Prediction"
            description="Use our AI-powered prediction system to input your symptoms and get instant health insights about potential risks."
            icon={<Stethoscope className="w-8 h-8 text-prediction" />}
            iconColor="bg-prediction/10"
            to="/prediction"
          />
          
          {/* Health Journal */}
          <FeatureCard
            title="Health Journal"
            description="Track your health journey with daily journal entries recording symptoms, moods, and progress to monitor patterns over time."
            icon={<CalendarCheck className="w-8 h-8 text-journal" />}
            iconColor="bg-journal/10"
            to="/journal"
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
