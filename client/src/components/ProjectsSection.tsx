import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animateProjectCard } from "@/lib/animations";
import { ArrowRight, Github, ExternalLink, X } from "lucide-react";
import { ProjectModal } from "./ProjectModal";

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

const projects: Project[] = [
  {
    id: 1,
    title: "Cloud Analytics Dashboard",
    description: "A real-time analytics dashboard for cloud infrastructure monitoring with customizable widgets and alerts.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["React", "TypeScript", "D3.js", "AWS"],
    github: "https://github.com",
    demo: "https://example.com",
    features: [
      "Real-time data visualization with WebSockets",
      "Custom dashboard builder with drag-and-drop",
      "Alert system with notification preferences",
      "Role-based access control",
      "Exportable reports in multiple formats"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Task Manager",
    description: "A task management application that uses AI to prioritize and categorize tasks, with natural language processing for task creation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Next.js", "TensorFlow", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
    features: [
      "Natural language task creation",
      "AI-powered task prioritization",
      "Smart categorization based on task content",
      "Productivity analytics and insights",
      "Cross-platform synchronization"
    ]
  },
  {
    id: 3,
    title: "Crypto Portfolio Tracker",
    description: "A real-time cryptocurrency portfolio tracker with advanced charting, price alerts, and performance analytics.",
    image: "https://images.unsplash.com/photo-1603969072881-b0fc7f3d6d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Vue.js", "Firebase", "Chart.js", "REST APIs"],
    github: "https://github.com",
    demo: "https://example.com",
    features: [
      "Real-time price tracking for 5000+ cryptocurrencies",
      "Portfolio performance analytics with ROI calculations",
      "Customizable price alerts and notifications",
      "Historical data visualization with advanced charts",
      "News aggregation and sentiment analysis"
    ]
  },
  {
    id: 4,
    title: "AR Shopping Experience",
    description: "An augmented reality shopping app that allows users to visualize products in their space before purchasing.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    tech: ["React Native", "ARKit", "ARCore", "Redux"],
    github: "https://github.com",
    demo: "https://example.com",
    features: [
      "Augmented reality product placement in real space",
      "Accurate size and scale representation",
      "Product customization in AR view",
      "Social sharing of AR visualizations",
      "Integration with multiple e-commerce platforms"
    ]
  }
];

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (inView) {
      projectRefs.current.forEach(card => {
        if (card) {
          animateProjectCard(card);
        }
      });
    }
  }, [inView]);
  
  return (
    <section id="projects" ref={ref} className="section py-24" data-section="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center" data-animate>
          <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Featured Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="project-card bg-card rounded-lg overflow-hidden shadow-xl"
              data-animate
            >
              <div className="overflow-hidden h-48">
                <div 
                  className="w-full h-full bg-cover bg-center project-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display font-semibold text-xl">{project.title}</h3>
                  <div className="flex gap-2">
                    <a href={project.demo} className="text-muted-foreground hover:text-primary transition-colors hover-target" aria-label="View live demo">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                <button 
                  className="view-project text-primary text-sm font-medium flex items-center gap-1 mt-2 transition-all hover:gap-2 hover-target"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        

      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
