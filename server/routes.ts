import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { WebSocketServer, WebSocket } from 'ws';

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = contactSchema.parse(req.body);
      
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || '',
          pass: process.env.EMAIL_PASSWORD || ''
        }
      });
      
      // Email content
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || 'noreply@example.com'}>`,
        to: 'pkthigulla@gmail.com',
        subject: `Portfolio Contact: ${validatedData.subject}`,
        text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Subject:</strong> ${validatedData.subject}</p>
<p><strong>Message:</strong></p>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `
      };
      
      try {
        // Send email if credentials are provided
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
          await transporter.sendMail(mailOptions);
          console.log("Contact form email sent successfully");
        } else {
          // Just log the data if no email credentials
          console.log("Contact form submission (email not sent, missing credentials):", validatedData);
          console.log("To enable email sending, please set EMAIL_USER and EMAIL_PASSWORD environment variables");
        }
        
        res.status(200).json({ message: "Message sent successfully!" });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Still return success to user, but log the error
        res.status(200).json({ message: "Message received! However, there was an issue sending the email notification." });
      }
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

  // Visitor counter endpoints
  app.get("/api/visitors", async (req, res) => {
    try {
      const count = await storage.getVisitorCount();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error getting visitor count:", error);
      res.status(500).json({ message: "Failed to get visitor count" });
    }
  });

  app.post("/api/visitors/increment", async (req, res) => {
    try {
      // Get client ID from request
      const { clientId } = req.body;
      
      if (!clientId) {
        return res.status(400).json({ message: "Client ID is required" });
      }
      
      // Check if this is a new visit and increment if needed
      const count = await storage.checkAndIncrementVisitorCount(clientId);
      
      // Broadcast updated count to all connected WebSocket clients
      broadcastVisitorCount(count);
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error processing visitor count:", error);
      res.status(500).json({ message: "Failed to process visitor count" });
    }
  });

  const httpServer = createServer(app);

  // Initialize WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store connected clients
  const clients = new Set<any>();

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    clients.add(ws);

    // Send current visitor count to new client
    storage.getVisitorCount().then(count => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'visitorCount', count }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      clients.delete(ws);
    });
  });

  // Function to broadcast updated count to all connected WebSocket clients
  function broadcastVisitorCount(count: number) {
    const message = JSON.stringify({ type: 'visitorCount', count });
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  return httpServer;
}
