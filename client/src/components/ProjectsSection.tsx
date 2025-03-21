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
    title: "Intelligent Q&A Extraction System",
    description: "An advanced NLP-powered system that extracts questions and answers from unstructured text with high accuracy and contextual understanding.",
    image: "https://images.unsplash.com/photo-1616628188550-808682f3926d?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Python", "Transformers", "BERT", "SpaCy", "TensorFlow"],
    github: "#",
    demo: "#",
    features: [
      "Advanced NLP with transformer-based architecture for semantic understanding",
      "Machine learning models fine-tuned for question identification and pairing",
      "Context-aware extraction with 92% accuracy on complex documents",
      "Multi-language support with dynamic ontology mapping",
      "Self-improving system with feedback loops for continuous model training"
    ]
  },
  {
    id: 2,
    title: "Immersive Virtual Event Platform",
    description: "A groundbreaking virtual event platform with 3D environments, spatial audio, and real-time collaboration tools for truly immersive remote gatherings.",
    image: "https://images.unsplash.com/photo-1550029402-226115b7c579?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["WebGL", "Three.js", "WebRTC", "React", "Node.js", "Redis"],
    github: "#",
    demo: "#",
    features: [
      "Custom 3D environment builder with real-time collaboration",
      "Spatial audio integration that mimics real-world sound propagation",
      "Dynamic networking algorithm for optimal attendee connections",
      "AI-driven content recommendation based on interaction patterns",
      "Real-time translation and accessibility features for global inclusivity"
    ]
  },
  {
    id: 3,
    title: "Predictive Healthcare Analytics Platform",
    description: "An innovative healthcare platform using machine learning to predict patient outcomes, optimize treatment plans, and improve care efficiency.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Python", "TensorFlow", "GraphQL", "React", "PostgreSQL", "Docker"],
    github: "#",
    demo: "#",
    features: [
      "Privacy-preserving federated learning across medical institutions",
      "Real-time risk stratification with explainable AI techniques",
      "Custom medical ontology integration for domain-specific insights",
      "Treatment optimization engine with personalized recommendations",
      "Secure data handling compliant with HIPAA and GDPR regulations"
    ]
  },
  {
    id: 4,
    title: "Autonomous Inventory Management System",
    description: "A cutting-edge inventory management system using computer vision and IoT to automate stock tracking, predict shortages, and optimize supply chains.",
    image: "https://images.unsplash.com/photo-1565430182015-5f53d77a5e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    tech: ["Computer Vision", "IoT", "React", "Node.js", "TensorFlow", "AWS"],
    github: "#",
    demo: "#",
    features: [
      "Real-time inventory tracking through distributed IoT sensors",
      "Computer vision for automatic product recognition and counting",
      "Predictive analytics for demand forecasting and stock optimization",
      "Supply chain integration with automatic reordering capabilities",
      "Anomaly detection for shrinkage prevention and quality control"
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
