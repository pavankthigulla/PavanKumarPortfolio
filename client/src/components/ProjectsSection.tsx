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
    title: "CultureConnect – Cultural Exchange Web App",
    description: "A platform where users from different countries connect to learn about each other's culture through chats, challenges, and virtual events.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    github: "https://github.com/pavankumar/culture-connect",
    demo: "https://culture-connect.vercel.app",
    features: [
      "Interest-based user matching for meaningful cultural exchanges",
      "Real-time chat system with built-in translation support",
      "Interactive cultural quiz challenges with gamification",
      "Event calendar with RSVP system for virtual meetups",
      "User profiles showcasing cultural backgrounds and interests"
    ]
  },
  {
    id: 2,
    title: "SkillSync – Peer Mentorship & Session Booking",
    description: "A micro-mentorship platform where users can offer or book 30-minute knowledge-sharing sessions with peers across various professional fields.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Next.js", "Tailwind CSS", "Firebase", "Google Calendar API"],
    github: "https://github.com/pavankumar/skillsync",
    demo: "https://skillsync-booking.vercel.app",
    features: [
      "Comprehensive skill-based mentor search and matching system",
      "Interactive session booking with availability slot selection",
      "Firebase authentication and real-time database updates",
      "Detailed session feedback and history tracking",
      "Calendar integration for seamless scheduling experience"
    ]
  },
  {
    id: 3,
    title: "ShopVerse – 3D Product Viewer E-commerce",
    description: "A React-based e-commerce site where users can view and interact with 3D models of products before adding them to their cart for an immersive shopping experience.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["React.js", "Three.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/pavankumar/shopverse",
    demo: "https://shopverse-demo.vercel.app",
    features: [
      "Interactive 3D product viewer with rotate, zoom, and explore functionality",
      "Comprehensive product listing and detail pages with specifications",
      "Fully functional cart and checkout interface with payment simulation",
      "User wishlist and favorites management system",
      "Admin panel for product management and 3D model uploads"
    ]
  },
  {
    id: 4,
    title: "InsightExtractor – Q&A Generator from Text",
    description: "A Python tool that automatically generates question-answer pairs from long texts or PDFs, making it perfect for study materials or quick content review.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Python", "spaCy", "Transformers (T5)", "PyPDF2", "Streamlit"],
    github: "https://github.com/pavankumar/insight-extractor",
    demo: "https://insight-extractor.herokuapp.com",
    features: [
      "Multi-format text input support including raw text, PDFs, and web articles",
      "Advanced NLP-powered key fact identification and extraction",
      "Customizable question generation based on identified content importance",
      "Export functionality for Q&A pairs in various formats (PDF, CSV, Flashcards)",
      "Interactive web interface for easy document processing and review"
    ]
  },
  {
    id: 5,
    title: "SmartMed Assist – iOS Medicine Tracking",
    description: "A health-focused iOS app that helps users keep track of their medicine schedules, get timely reminders, and access basic medicine information.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Swift", "SwiftUI", "Firebase", "Cloud Messaging"],
    github: "https://github.com/pavankumar/smartmed-assist",
    demo: "https://apps.apple.com/demo/smartmed-assist",
    features: [
      "Intelligent medicine reminder system with customizable notifications",
      "Cross-device synchronization through Firebase integration",
      "Comprehensive prescription logging with date and time tracking",
      "Medication information database with search functionality",
      "Intuitive dashboard displaying upcoming doses and adherence stats"
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
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center heading-glow" data-animate>
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
                  <h3 className="font-display font-semibold text-xl heading-glow">{project.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors hover-target"
                      aria-label="View GitHub repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors hover-target"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <button 
                    className="view-project text-primary text-sm font-medium flex items-center gap-1 transition-all hover:gap-2 hover-target"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
