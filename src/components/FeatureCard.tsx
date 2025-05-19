
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
    <div className="feature-card h-full">
      <div className={`feature-icon ${iconColor}`}>
        {icon}
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground text-center mb-6">{description}</p>
      <Button variant="default" asChild className="mt-auto">
        <Link to={to}>Open</Link>
      </Button>
    </div>
  );
};

export default FeatureCard;
