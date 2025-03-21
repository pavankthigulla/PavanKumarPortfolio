import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" ref={ref} className="section bg-muted/30 py-24" data-section="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2" data-animate>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">About Me</span>
            </h2>
            
            <div className="text-muted-foreground space-y-4 mb-8">
              <p>
                Hello! I'm Pavan, an experienced Software Engineer with expertise in full-stack development.
                I specialize in React, Spring Boot, and Node.js, building modern and efficient applications.
              </p>
              <p>
                I'm proficient in enhancing project efficiency, optimizing API integrations, and delivering scalable, 
                user-focused solutions. With a strong background in testing, deployment, and Agile practices, 
                I have a proven track record of improving system performance and reliability.
              </p>
              <p>
                I'm committed to leveraging my technical expertise and problem-solving skills to contribute to innovative 
                software engineering projects.
              </p>
            </div>
            
            <div className="timeline-container pt-8">
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg">Software Engineer @ Edward Jones</h3>
                <p className="text-primary text-sm mb-2">01/2024 - Present</p>
                <p className="text-muted-foreground">Developing backend services using Java, Spring Framework, and building responsive frontend interfaces with React.</p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg">Full Stack Developer @ Zemoso Technologies</h3>
                <p className="text-primary text-sm mb-2">01/2022 - 05/2022</p>
                <p className="text-muted-foreground">Designed RESTful APIs with Java/Spring, developed React frontend components, and optimized MongoDB database performance.</p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg">Full Stack Developer @ Fagito</h3>
                <p className="text-primary text-sm mb-2">07/2020 - 12/2021</p>
                <p className="text-muted-foreground">Built food delivery platform backend with Java/Spring Boot, integrated payment gateways, and implemented CI/CD pipelines.</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative" data-animate>
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative animate-float">
              <div className="absolute inset-0 bg-primary/20 rounded-lg backdrop-blur-sm"></div>
              <div 
                className="absolute inset-2 bg-gradient-to-br from-background to-muted border border-primary/30
                bg-cover bg-center rounded-lg shadow-lg transform rotate-3"
              ></div>
              <div className="absolute -bottom-4 -right-4 bg-muted p-3 rounded shadow-lg w-40 animate-slideInRight">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                  <p className="text-xs font-code">React Expert</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-muted p-3 rounded shadow-lg w-40 animate-slideInLeft">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-secondary mr-2"></div>
                  <p className="text-xs font-code">Java Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
