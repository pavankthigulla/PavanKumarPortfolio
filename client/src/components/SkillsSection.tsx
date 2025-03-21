import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { animateSkillBars } from "@/lib/animations";
import { Check, Code, Database, Cloud, Server, FileCode, GitBranch, Terminal, Laptop } from "lucide-react";
import { 
  FaJsSquare, FaReact, FaHtml5, FaCss3Alt, FaAngular, FaBootstrap, 
  FaJava, FaNodeJs, FaPython, FaDocker, FaGithub, FaGitlab, FaWindows
} from "react-icons/fa";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const frontendSkills: Skill[] = [
  { name: "JavaScript", icon: <FaJsSquare size={24} className="text-yellow-400" /> },
  { name: "React", icon: <FaReact size={24} className="text-cyan-400" /> },
  { name: "HTML", icon: <FaHtml5 size={24} className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt size={24} className="text-blue-400" /> },
  { name: "Angular", icon: <FaAngular size={24} className="text-red-500" /> },
  { name: "Bootstrap", icon: <FaBootstrap size={24} className="text-purple-500" /> }
];

const backendSkills: Skill[] = [
  { name: "Java", icon: <FaJava size={24} className="text-orange-600" /> },
  { name: "Spring Boot", icon: <Server size={24} className="text-green-500" /> },
  { name: "Node.js", icon: <FaNodeJs size={24} className="text-green-600" /> },
  { name: "Python", icon: <FaPython size={24} className="text-yellow-500" /> },
  { name: "REST APIs", icon: <Code size={24} className="text-gray-400" /> },
  { name: "Microservices", icon: <Server size={24} className="text-blue-300" /> },
  { name: "Docker", icon: <FaDocker size={24} className="text-blue-500" /> }
];

const databaseSkills: Skill[] = [
  { name: "MySQL", icon: <Database size={24} className="text-blue-600" /> },
  { name: "MongoDB", icon: <Database size={24} className="text-green-500" /> },
  { name: "PostgreSQL", icon: <Database size={24} className="text-blue-400" /> }
];

const cloudSkills: Skill[] = [
  { name: "AWS", icon: <Cloud size={24} className="text-yellow-500" /> },
  { name: "Azure", icon: <FaWindows size={24} className="text-blue-500" /> },
  { name: "Cloud Computing", icon: <Cloud size={24} className="text-sky-400" /> }
];

const otherSkills: Skill[] = [
  { name: "JUnit", icon: <FileCode size={24} className="text-red-500" /> },
  { name: "Jest", icon: <FileCode size={24} className="text-red-600" /> },
  { name: "CI/CD", icon: <GitBranch size={24} className="text-green-400" /> },
  { name: "Agile", icon: <Check size={24} className="text-blue-500" /> },
  { name: "JIRA", icon: <Check size={24} className="text-blue-400" /> }
];

const tools: Skill[] = [
  { name: "VS Code", icon: <Laptop size={24} className="text-blue-500" /> },
  { name: "Eclipse", icon: <Terminal size={24} className="text-purple-500" /> },
  { name: "Git", icon: <GitBranch size={24} className="text-orange-600" /> },
  { name: "GitHub", icon: <FaGithub size={24} className="text-white" /> },
  { name: "GitLab", icon: <FaGitlab size={24} className="text-orange-500" /> },
  { name: "Postman", icon: <Code size={24} className="text-orange-400" /> }
];

const certifications = [
  { name: "If there were a certification for dodging certifications, I'd probably not have that one either. 🤣", issuer: "" }
];

export const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      animateSkillBars();
    }
  }, [inView]);

  return (
    <section id="skills" ref={ref} className="section bg-muted/30 py-24" data-section="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center heading-glow" data-animate>
          <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Skills & Expertise</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Frontend Skills */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Frontend Development</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {frontendSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Backend Skills */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Backend Development</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {backendSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Database Skills */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Databases</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {databaseSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cloud Skills */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Cloud Technologies</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {cloudSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Other Skills */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Development Practices</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {otherSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Tools & Utilities</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
                    {tool.icon}
                  </div>
                  <span className="font-medium text-sm">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mt-16" data-animate>
          <h3 className="text-xl font-display font-semibold relative heading-glow mb-6 text-center">
            <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Certifications</span>
          </h3>
          
          <div className="max-w-xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="flex gap-4 items-center p-5 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
                <div className="animate-bounce bg-primary/20 p-2 rounded-full">
                  <span className="text-2xl">🤣👐</span>
                </div>
                <div>
                  <h4 className="font-semibold heading-glow leading-relaxed">{cert.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
