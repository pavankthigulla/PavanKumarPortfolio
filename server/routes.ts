import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema } from "@shared/schema";
import nodemailer from "nodemailer";

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

  const httpServer = createServer(app);

  return httpServer;
}
