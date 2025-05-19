
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import { MessageCircle, FileText, Ambulance, Stethoscope, CalendarCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-container py-12">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to Care AI
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Your comprehensive healthcare companion providing personalized health assistance, 
          medical report analysis, emergency services, health predictions, and personal health journaling.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Chat with Care AI */}
          <FeatureCard
            title="Chat with Care AI"
            description="Your personal health assistant powered by RAG technology. Get reliable answers to all your health queries from our comprehensive medical knowledge base!"
            icon={<MessageCircle className="w-8 h-8 text-chat" />}
            iconColor="bg-chat/20"
            to="/chat"
          />
          
          {/* Report Analysis */}
          <FeatureCard
            title="Report Analysis"
            description="Upload your medical reports and get instant interpretations! Our advanced OCR technology reads and analyzes your health documents to provide clear insights and guidance."
            icon={<FileText className="w-8 h-8 text-report" />}
            iconColor="bg-report/20"
            to="/report-analysis"
          />
          
          {/* Emergency Assistant */}
          <FeatureCard
            title="Emergency Assistant"
            description="Quick access to emergency services with real-time location tracking and instant hospital notifications. Share health details and get immediate assistance!"
            icon={<Ambulance className="w-8 h-8 text-emergency" />}
            iconColor="bg-emergency/20"
            to="/emergency"
          />
          
          {/* Disease Prediction */}
          <FeatureCard
            title="Disease Prediction"
            description="Advanced AI-powered disease prediction system using machine learning models. Input your symptoms and get instant health insights!"
            icon={<Stethoscope className="w-8 h-8 text-prediction" />}
            iconColor="bg-prediction/20"
            to="/prediction"
          />
          
          {/* Health Journal */}
          <FeatureCard
            title="Health Journal"
            description="Track your health journey with daily journal entries. Record symptoms, moods, and progress to better understand your health patterns over time."
            icon={<CalendarCheck className="w-8 h-8 text-journal" />}
            iconColor="bg-journal/20"
            to="/journal"
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
