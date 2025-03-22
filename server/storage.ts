import { users, type User, type InsertUser, type VisitorStats } from "@shared/schema";
import * as fs from 'fs';
import * as path from 'path';

// File path for storing visitor count
const VISITOR_COUNT_FILE = path.join(process.cwd(), 'visitor-count.json');

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getVisitorCount(): Promise<number>;
  incrementVisitorCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private visitorCount: number;
  currentId: number;

  constructor() {
    this.users = new Map();
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
    } catch (error) {
      console.error('Error loading visitor count from file:', error);
      this.visitorCount = 0;
    }
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

  async incrementVisitorCount(): Promise<number> {
    this.visitorCount++;
    this.saveVisitorCount(); // Save to file on each increment
    return this.visitorCount;
  }
}

export const storage = new MemStorage();
