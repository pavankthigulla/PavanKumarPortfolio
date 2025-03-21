import { Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4 mb-2">
            <a 
              href="https://www.linkedin.com/in/pavan-kumar-698b65277/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover-target"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <div>
            <p className="text-muted-foreground">© {new Date().getFullYear()} Pavan Kumar. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
