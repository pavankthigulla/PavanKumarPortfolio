import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { animateSkillBars } from "@/lib/animations";
import { Check } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
}

const frontendSkills: Skill[] = [
  { name: "JavaScript / TypeScript", percentage: 90 },
  { name: "React", percentage: 92 },
  { name: "HTML / CSS", percentage: 88 },
  { name: "Angular", percentage: 85 },
  { name: "Bootstrap", percentage: 90 }
];

const backendSkills: Skill[] = [
  { name: "Java / Spring Boot", percentage: 95 },
  { name: "Node.js", percentage: 85 },
  { name: "Python", percentage: 80 },
  { name: "REST APIs", percentage: 92 },
  { name: "Microservices", percentage: 85 }
];

const otherSkills: Skill[] = [
  { name: "MySQL / MongoDB", percentage: 88 },
  { name: "AWS / Azure", percentage: 82 },
  { name: "CI/CD", percentage: 85 },
  { name: "Testing (JUnit, Jest)", percentage: 90 },
  { name: "Agile / JIRA", percentage: 95 }
];

const tools = [
  "VS Code", "Eclipse", "Git/GitHub", "GitLab", "JIRA", "Postman"
];

const certifications = [
  { name: "Object Oriented Programming in Java", issuer: "Online Education Platform" },
  { name: "Python Data Structures", issuer: "Online Education Platform" },
  { name: "Responsive Web Design", issuer: "HTML + CSS + JS" },
  { name: "SQL using MySQL", issuer: "Database Management Course" }
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
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Frontend Development</span>
            </h3>
            
            <div className="space-y-5">
              {frontendSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary text-sm">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.percentage}%` }} 
                      data-width={`${skill.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Backend Development</span>
            </h3>
            
            <div className="space-y-5">
              {backendSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary text-sm">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.percentage}%` }} 
                      data-width={`${skill.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-display font-semibold relative">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Other Skills</span>
            </h3>
            
            <div className="space-y-5">
              {otherSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary text-sm">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.percentage}%` }} 
                      data-width={`${skill.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8" data-animate>
          <div className="bg-card rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-display font-semibold">Tools & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tools.map((tool, index) => (
                <div key={index} className="text-center p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors hover-target">
                  <div className="w-8 h-8 mx-auto mb-2 text-primary flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">⚒️</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{tool}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-display font-semibold">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex gap-4 items-center p-3 bg-background/50 rounded-lg hover-target">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
