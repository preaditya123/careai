
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-header sticky top-0 z-10 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Care AI
          </span>
        </Link>
        <nav className="flex space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/chat" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Chat
          </Link>
          <Link to="/report-analysis" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Reports
          </Link>
          <Link to="/emergency" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Emergency
          </Link>
          <Link to="/prediction" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Health Predictor
          </Link>
          <Link to="/journal" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Journal
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
