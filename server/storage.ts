import { 
  users, 
  floorPlans, 
  amenities, 
  galleryImages, 
  contactSubmissions,
  type User, 
  type InsertUser,
  type FloorPlan,
  type InsertFloorPlan,
  type Amenity,
  type InsertAmenity,
  type GalleryImage,
  type InsertGalleryImage,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Floor Plans
  getFloorPlans(): Promise<FloorPlan[]>;
  getFloorPlan(id: number): Promise<FloorPlan | undefined>;
  createFloorPlan(floorPlan: InsertFloorPlan): Promise<FloorPlan>;
  updateFloorPlan(id: number, updates: Partial<FloorPlan>): Promise<FloorPlan | undefined>;
  
  // Amenities
  getAmenities(): Promise<Amenity[]>;
  getAmenitiesByCategory(category: string): Promise<Amenity[]>;
  createAmenity(amenity: InsertAmenity): Promise<Amenity>;
  
  // Gallery Images
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, updates: Partial<GalleryImage>): Promise<GalleryImage | undefined>;
  
  // Contact Submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getFloorPlans(): Promise<FloorPlan[]> {
    return await db.select().from(floorPlans).orderBy(floorPlans.startingPrice);
  }

  async getFloorPlan(id: number): Promise<FloorPlan | undefined> {
    const [floorPlan] = await db.select().from(floorPlans).where(eq(floorPlans.id, id));
    return floorPlan || undefined;
  }

  async createFloorPlan(insertFloorPlan: InsertFloorPlan): Promise<FloorPlan> {
    const [floorPlan] = await db
      .insert(floorPlans)
      .values(insertFloorPlan)
      .returning();
    return floorPlan;
  }

  async updateFloorPlan(id: number, updates: Partial<FloorPlan>): Promise<FloorPlan | undefined> {
    const [updated] = await db
      .update(floorPlans)
      .set(updates)
      .where(eq(floorPlans.id, id))
      .returning();
    return updated || undefined;
  }

  async getAmenities(): Promise<Amenity[]> {
    return await db.select().from(amenities).orderBy(amenities.category, amenities.name);
  }

  async getAmenitiesByCategory(category: string): Promise<Amenity[]> {
    return await db.select().from(amenities).where(eq(amenities.category, category));
  }

  async createAmenity(insertAmenity: InsertAmenity): Promise<Amenity> {
    const [amenity] = await db
      .insert(amenities)
      .values(insertAmenity)
      .returning();
    return amenity;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(desc(galleryImages.featured), galleryImages.createdAt);
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).where(eq(galleryImages.category, category));
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const [image] = await db
      .insert(galleryImages)
      .values(insertImage)
      .returning();
    return image;
  }

  async updateGalleryImage(id: number, updates: Partial<GalleryImage>): Promise<GalleryImage | undefined> {
    const [updated] = await db
      .update(galleryImages)
      .set(updates)
      .where(eq(galleryImages.id, id))
      .returning();
    return updated || undefined;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission || undefined;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }
}

export const storage = new DatabaseStorage();
