
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="main-header sticky top-0 z-10 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Care AI
          </span>
        </Link>
        <nav className="hidden md:flex space-x-1 lg:space-x-2">
          {[
            { path: "/", label: "Home" },
            { path: "/chat", label: "Chat" },
            { path: "/report-analysis", label: "Reports" },
            { path: "/emergency", label: "Emergency" },
            { path: "/prediction", label: "Health Predictor" },
            { path: "/journal", label: "Journal" }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
