import { Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Pavan Kumar. All Rights Reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/pavan-kumar-698b65277/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover-target"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <p className="text-muted-foreground text-center md:text-right text-sm">
              Designed & Built with <span className="text-primary">❤</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
