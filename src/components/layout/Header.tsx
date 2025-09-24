import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <nav className=" sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-clip-text text-black"
            >
              Karvaan Tours
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            {/* <Link
              to="/tours"
              className="text-foreground hover:text-primary transition-colors"
            >
              Tours
            </Link> */}
            {/* <Link to="/destinations" className="text-foreground hover:text-primary transition-colors">Destinations</Link> */}
            <Link
              to="/guide"
              className="text-foreground hover:text-primary transition-colors"
            >
              Guide
            </Link>
            {/* <Link
              to="/blogs"
              className="text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link> */}
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/admin/login"
              className="text-foreground hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 " />
              
            </Button>
            <Button variant="hero" size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
