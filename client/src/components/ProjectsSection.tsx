import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animateProjectCard } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["React.js (frontend UI)", "Node.js (server)", "Express.js (API routing)", "MongoDB (user and event data)", "Socket.io (real-time chat)"],
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
    title: "TaskPilot – Smart Team Task Management",
    description: "A team task management web app that supports different user roles (Admin, Manager, Member), project boards, real-time updates, and deadline tracking for small teams.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["React.js (frontend UI)", "Redux Toolkit (state management)", "Node.js (backend server)", "Express.js (REST API)", "PostgreSQL (relational database)"],
    github: "https://github.com/pavankumar/taskpilot",
    demo: "https://taskpilot-demo.vercel.app",
    features: [
      "Role-based dashboards with customized UI/views for different user levels",
      "Intuitive drag-and-drop task boards for visual workflow management",
      "Real-time updates when tasks are moved, edited or status-changed",
      "Automated task reminders via email or in-app notifications",
      "Comprehensive progress analytics for team performance tracking"
    ]
  },
  {
    id: 3,
    title: "ShopVerse – 3D Product Viewer E-commerce",
    description: "A React-based e-commerce site where users can view and interact with 3D models of products before adding them to their cart for an immersive shopping experience.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["React.js (frontend framework)", "Three.js (render 3D models)", "Node.js (backend server)", "Express.js (API handling)", "MongoDB (product & user data)"],
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
    image: "https://images.unsplash.com/photo-1546900703-cf06143d1239?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Python (core language)", "spaCy (named entity detection)", "Transformers - T5 (Q&A generation)", "PyPDF2 (PDF processing)", "Streamlit (web interface)"],
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
    title: "SmartMed Assist – Medication Management App",
    description: "A comprehensive iOS health app designed to help users manage their medications, track prescriptions, receive dose reminders, and access vital medicine information in one place.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Swift (language)", "SwiftUI (for building UI)", "Firebase Firestore (data storage)", "Firebase Auth (authentication)", "Cloud Messaging (notifications)"],
    github: "https://github.com/pavankumar/smartmed-assist",
    demo: "https://apps.apple.com/demo/smartmed-assist",
    features: [
      "Smart medication reminder system with customizable time-based notifications",
      "Pill identification feature using camera and image recognition technology",
      "Drug interaction checker to prevent harmful medication combinations",
      "Comprehensive prescription management with refill tracking and pharmacy integration",
      "Family sharing capabilities to help manage medications for loved ones",
      "Emergency medical information card accessible from lock screen",
      "Medication adherence tracking with visual progress reports and insights"
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
                
                <div className="flex items-center justify-end mt-4">                  
                  <button 
                    className="view-project text-primary text-sm font-medium flex items-center gap-1 transition-all hover:gap-2 cursor-pointer !z-50"
                    onClick={() => setSelectedProject(project)}
                    style={{ zIndex: 50 }}
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
