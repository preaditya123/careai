
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconColor: string;
  to: string;
}

const FeatureCard = ({ title, description, icon, iconColor, to }: FeatureCardProps) => {
  return (
    <div className="feature-card group h-full flex flex-col items-center">
      <div className={`feature-icon ${iconColor} group-hover:animate-float`}>
        {icon}
      </div>
      <h2 className="text-xl font-bold mb-3 text-center">{title}</h2>
      <p className="text-sm text-muted-foreground text-center mb-6 flex-grow">{description}</p>
      <Button variant="outline" asChild className="mt-auto w-full sm:w-auto border-primary/40 hover:bg-primary hover:text-white transition-colors duration-300">
        <Link to={to}>Explore</Link>
      </Button>
    </div>
  );
};

export default FeatureCard;
