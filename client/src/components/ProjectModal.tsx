import { useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";

interface ProjectFeature {
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  features: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "project-modal-overlay") {
        onClose();
      }
    };
    
    if (project) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);
  
  if (!project) return null;
  
  return (
    <div 
      id="project-modal-overlay"
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 animate-fadeIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-2xl">{project.title}</h3>
            <button 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground transition-colors hover-target"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div 
              className="w-full h-64 md:h-80 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
            
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-lg">Project Overview</h4>
              <p className="text-muted-foreground">{project.description}</p>
              
              <div>
                <h4 className="font-display font-semibold text-lg mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-display font-semibold text-lg mb-2">Key Features</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4 pt-2">
                <a 
                  href={project.demo} 
                  className="bg-primary hover:bg-primary-dark text-black px-5 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 hover-target"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href={project.github} 
                  className="border-2 border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground px-5 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 hover-target"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
