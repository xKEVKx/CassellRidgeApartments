import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Maximum allowed size for a stored image URL (base64 data URI).
// A 5 MB binary file base64-encodes to ≈ 6.77 MB; adding the data-URI prefix
// and a small buffer gives 7 MB as the ceiling. Any imageUrl larger than this
// is rejected by Zod validation before it reaches the database.
export const MAX_IMAGE_URL_LENGTH = 7 * 1024 * 1024; // 7 MB in chars

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const floorPlans = pgTable("floor_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: decimal("bathrooms", { precision: 3, scale: 1 }).notNull(),
  sqft: integer("sqft").notNull(),
  startingPrice: integer("starting_price").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  available: boolean("available").default(true),
  promotionAvailable: boolean("promotion_available").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  promoLastUpdated: timestamp("promo_last_updated").defaultNow(),
});

export const amenities = pgTable("amenities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'property' or 'apartment'
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // 'interior', 'exterior', 'amenities', 'pool'
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  type: text("type").notNull().default("general"), // 'general', 'schedule_visit', 'apply'
  metadata: jsonb("metadata"), // Additional form data
  status: text("status").notNull().default("new"), // 'new', 'contacted', 'closed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const homePageAds = pgTable("home_page_ads", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  displayFrequency: integer("display_frequency").default(5),
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFloorPlanSchema = createInsertSchema(floorPlans).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
  promoLastUpdated: true,
});

export const insertAmenitySchema = createInsertSchema(amenities).omit({
  id: true,
  createdAt: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
}).extend({
  imageUrl: z.string().max(MAX_IMAGE_URL_LENGTH, "Image is too large. Maximum size is 5 MB."),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertHomePageAdSchema = createInsertSchema(homePageAds, {
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  imageUrl: z.string().max(MAX_IMAGE_URL_LENGTH, "Image is too large. Maximum size is 5 MB."),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFloorPlan = z.infer<typeof insertFloorPlanSchema>;
export type FloorPlan = typeof floorPlans.$inferSelect;

export type InsertAmenity = z.infer<typeof insertAmenitySchema>;
export type Amenity = typeof amenities.$inferSelect;

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertHomePageAd = z.infer<typeof insertHomePageAdSchema>;
export type HomePageAd = typeof homePageAds.$inferSelect;
