import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SiGmail } from "react-icons/si";
import { HiLocationMarker } from "react-icons/hi";
import { AnimatedText } from "./AnimatedText";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="section py-24" data-section="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center heading-glow" data-animate>
          <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Get In Touch</span>
        </h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" data-animate>
            <div className="min-h-[4rem] mb-6 bg-card/30 rounded-lg p-4 backdrop-blur-sm shadow-md border border-primary/20">
              <AnimatedText 
                text="I'm currently available for new opportunities. Whether you have a project idea, job opportunity, or just want to connect, feel free to reach out!" 
                className="text-lg text-primary-foreground font-medium"
                speed={40}
                delay={500}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-background p-3 rounded-full">
                  <SiGmail className="w-6 h-6 text-[#EA4335]" />
                </div>
                <div>
                  <h3 className="font-semibold heading-glow">Email</h3>
                  <p className="text-muted-foreground">Contact me using the form</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-background p-3 rounded-full">
                  <HiLocationMarker className="w-6 h-6 text-[#4285F4]" />
                </div>
                <div>
                  <h3 className="font-semibold heading-glow">Location</h3>
                  <p className="text-muted-foreground">California</p>
                </div>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-4 bg-card p-6 rounded-lg shadow-lg border border-primary/20" 
              data-animate
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        className="bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="What's this about?" 
                        className="bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message here..." 
                        className="bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                variant="outline"
                className="w-full bg-transparent border-primary text-white hover:bg-primary/20 font-medium transition-all duration-300 hover-target animate-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
