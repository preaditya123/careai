
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import { MessageCircle, FileText, Ambulance, Stethoscope, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        {/* Hero Section with Left-Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Side: Title and CTA */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-left text-foreground">
              Your Complete <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Healthcare AI</span> Companion
            </h1>
            <p className="text-muted-foreground mb-8 text-left">
              Care AI provides personalized health assistance, medical report analysis, 
              emergency services, health predictions, and personal health journaling.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/chat">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link to="/journal">Track Your Health</Link>
              </Button>
            </div>
          </div>
          
          {/* Right Side: Services */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ServiceItem 
                icon={<MessageCircle className="w-5 h-5 text-chat" />} 
                title="Chat with Care AI" 
                to="/chat" 
              />
              <ServiceItem 
                icon={<FileText className="w-5 h-5 text-report" />} 
                title="Report Analysis" 
                to="/report-analysis" 
              />
              <ServiceItem 
                icon={<Ambulance className="w-5 h-5 text-emergency" />} 
                title="Emergency Assistant" 
                to="/emergency" 
              />
              <ServiceItem 
                icon={<Stethoscope className="w-5 h-5 text-prediction" />} 
                title="Disease Prediction" 
                to="/prediction" 
              />
              <ServiceItem 
                icon={<CalendarCheck className="w-5 h-5 text-journal" />} 
                title="Health Journal" 
                to="/journal" 
              />
            </div>
          </div>
        </div>
        
        {/* Feature Cards Section */}
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

// Simple component for service items in the hero section
const ServiceItem = ({ icon, title, to }: { icon: React.ReactNode; title: string; to: string }) => (
  <Link to={to} className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors group">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-3">
      {icon}
    </div>
    <span className="text-sm font-medium group-hover:text-primary transition-colors">{title}</span>
  </Link>
);

export default Index;
