import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = contactSchema.parse(req.body);
      
      // In a real implementation, you would send an email here
      // For now, let's just log the data
      console.log("Contact form submission:", validatedData);
      
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: error.errors,
        });
      }
      
      res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
