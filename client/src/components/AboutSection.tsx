import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SimpleGame } from "./SimpleGame";

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" ref={ref} className="section bg-muted/30 py-24" data-section="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-7/12" data-animate>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">About Me</span>
            </h2>
            
            <div className="text-muted-foreground space-y-4 mb-8">
              <p>
                Hey, I'm Pavan. I'm someone who's always exploring whether it's new ideas, unexpected problems, or just the way things work. 
                I enjoy diving into the unknown, figuring out how stuff fits together, and constantly learning along the way.
              </p>
              <p>
                Life's not always straightforward, but I've come to appreciate the moments where things click, even if they come after a lot of trial and error. 
                For me, it's less about having all the answers and more about enjoying the process of figuring things out.
              </p>
              <p>
                I believe in growth, not just in skills, but in perspective and mindset. Every day is a chance to evolve, 
                challenge myself, and hopefully leave things a little better than I found them :)
              </p>
            </div>
            
            <div className="timeline-container pt-8">
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Software Engineer @ Edward Jones</h3>
                <p className="text-primary text-sm mb-2">01/2024 - Present</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">Currently working with a microservices architecture to develop backend services using Spring Boot, Java, and Kafka. I design and build services that interact seamlessly, ensuring smooth data processing and reliable communication. My role also involves identifying and removing performance bottlenecks and improving how services exchange data in real time for optimal system efficiency.</p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Northwest Missouri State University</h3>
                <p className="text-primary text-sm mb-2">08/2022 - 12/2023 (GPA: 4.0)</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">Pursued a master's degree in Applied Computer Science and worked on a project developing a healthcare app that helps patients take medicines on time by sending reminders, tracking health status, managing prescriptions, and enabling easy communication with doctors.</p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Full Stack Developer @ Zemoso Technologies</h3>
                <p className="text-primary text-sm mb-2">01/2022 - 05/2022</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">At Zemoso, I worked on both frontend and backend development, with my main tech stack being React.js for building user interfaces and Spring Boot with Hibernate for the backend. I focused on connecting the frontend and backend to ensure everything worked smoothly while sticking to clean code practices.</p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Full Stack Developer @ Fagito</h3>
                <p className="text-primary text-sm mb-2">07/2020 - 12/2021</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">As part of a small team, we handled every aspect of the food delivery platform, diving into both frontend and backend development. I worked on building backend services with Spring Boot, developing the frontend using React, integrating payment systems, and creating a smart restaurant-matching system to reduce delivery delays. We also improved the order management system, ensuring it was good enough to handle high volumes of transactions during peak times.</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-5/12 mt-10 md:mt-20" data-animate>
            <div className="transform transition-all duration-500 hover:scale-[1.02]">
              <SimpleGame />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
