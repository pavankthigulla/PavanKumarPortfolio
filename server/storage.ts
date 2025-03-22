import { users, type User, type InsertUser, type VisitorStats } from "@shared/schema";
import * as fs from 'fs';
import * as path from 'path';

// File paths for storing data
const VISITOR_COUNT_FILE = path.join(process.cwd(), 'visitor-count.json');
const VISITOR_SESSIONS_FILE = path.join(process.cwd(), 'visitor-sessions.json');

// Session expiration time (1 hour in milliseconds)
const SESSION_EXPIRATION = 60 * 60 * 1000; // 1 hour

// Interface for tracking visitor sessions
interface VisitorSession {
  id: string; // Client ID (generated on client side)
  timestamp: number; // Last visit timestamp
}

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getVisitorCount(): Promise<number>;
  checkAndIncrementVisitorCount(clientId: string): Promise<number>;
  isNewVisitor(clientId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private visitorCount: number;
  private visitorSessions: Map<string, number>; // clientId -> timestamp
  currentId: number;

  constructor() {
    this.users = new Map();
    this.visitorSessions = new Map();
    this.currentId = 1;
    
    // Initialize visitor count from file if it exists
    try {
      if (fs.existsSync(VISITOR_COUNT_FILE)) {
        const data = fs.readFileSync(VISITOR_COUNT_FILE, 'utf-8');
        const parsed = JSON.parse(data);
        this.visitorCount = parsed.count || 0;
        console.log(`Loaded visitor count from file: ${this.visitorCount}`);
      } else {
        this.visitorCount = 0;
        this.saveVisitorCount();
        console.log('Created new visitor count file');
      }

      // Load visitor sessions
      if (fs.existsSync(VISITOR_SESSIONS_FILE)) {
        const sessionsData = fs.readFileSync(VISITOR_SESSIONS_FILE, 'utf-8');
        const sessionsParsed = JSON.parse(sessionsData);
        
        // Convert to Map and filter out expired sessions
        const now = Date.now();
        sessionsParsed.sessions.forEach((session: VisitorSession) => {
          if (now - session.timestamp < SESSION_EXPIRATION) {
            this.visitorSessions.set(session.id, session.timestamp);
          }
        });
        
        console.log(`Loaded ${this.visitorSessions.size} active visitor sessions`);
        
        // Cleanup expired sessions periodically
        this.cleanupExpiredSessions();
      } else {
        this.saveVisitorSessions();
        console.log('Created new visitor sessions file');
      }
    } catch (error) {
      console.error('Error loading data from files:', error);
      this.visitorCount = 0;
      // Continue with empty sessions
    }
    
    // Set up periodic cleanup of expired sessions (every 15 minutes)
    setInterval(() => this.cleanupExpiredSessions(), 15 * 60 * 1000);
  }

  private saveVisitorCount(): void {
    try {
      fs.writeFileSync(
        VISITOR_COUNT_FILE,
        JSON.stringify({ count: this.visitorCount }),
        'utf-8'
      );
    } catch (error) {
      console.error('Error saving visitor count to file:', error);
    }
  }
  
  private saveVisitorSessions(): void {
    try {
      // Convert Map to array of objects for JSON storage (compatible with older JS targets)
      const sessions: VisitorSession[] = [];
      
      this.visitorSessions.forEach((timestamp, id) => {
        sessions.push({ id, timestamp });
      });
      
      fs.writeFileSync(
        VISITOR_SESSIONS_FILE,
        JSON.stringify({ sessions }),
        'utf-8'
      );
    } catch (error) {
      console.error('Error saving visitor sessions to file:', error);
    }
  }
  
  private cleanupExpiredSessions(): void {
    const now = Date.now();
    let expiredCount = 0;
    
    // Remove expired sessions (compatible with older JS targets)
    this.visitorSessions.forEach((timestamp, clientId) => {
      if (now - timestamp >= SESSION_EXPIRATION) {
        this.visitorSessions.delete(clientId);
        expiredCount++;
      }
    });
    
    if (expiredCount > 0) {
      console.log(`Cleaned up ${expiredCount} expired visitor sessions`);
      this.saveVisitorSessions();
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getVisitorCount(): Promise<number> {
    return this.visitorCount;
  }
  
  async isNewVisitor(clientId: string): Promise<boolean> {
    // Check if this is a new visitor or if their session has expired
    const lastVisit = this.visitorSessions.get(clientId);
    const now = Date.now();
    
    if (!lastVisit || (now - lastVisit) >= SESSION_EXPIRATION) {
      return true;
    }
    
    return false;
  }

  async checkAndIncrementVisitorCount(clientId: string): Promise<number> {
    const isNew = await this.isNewVisitor(clientId);
    
    // Update the session timestamp regardless
    this.visitorSessions.set(clientId, Date.now());
    this.saveVisitorSessions();
    
    // Only increment count for new visitors or expired sessions
    if (isNew) {
      this.visitorCount++;
      this.saveVisitorCount();
    }
    
    return this.visitorCount;
  }
}

export const storage = new MemStorage();
