import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Floor Plans API
  app.get("/api/floor-plans", async (req, res) => {
    try {
      const floorPlans = await storage.getFloorPlans();
      res.json(floorPlans);
    } catch (error) {
      console.error("Error fetching floor plans:", error);
      res.status(500).json({ error: "Failed to fetch floor plans" });
    }
  });

  app.get("/api/floor-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const floorPlan = await storage.getFloorPlan(id);
      if (!floorPlan) {
        return res.status(404).json({ error: "Floor plan not found" });
      }
      res.json(floorPlan);
    } catch (error) {
      console.error("Error fetching floor plan:", error);
      res.status(500).json({ error: "Failed to fetch floor plan" });
    }
  });

  // Amenities API
  app.get("/api/amenities", async (req, res) => {
    try {
      const category = req.query.category as string;
      const amenities = category 
        ? await storage.getAmenitiesByCategory(category)
        : await storage.getAmenities();
      res.json(amenities);
    } catch (error) {
      console.error("Error fetching amenities:", error);
      res.status(500).json({ error: "Failed to fetch amenities" });
    }
  });

  // Gallery Images API
  app.get("/api/gallery", async (req, res) => {
    try {
      const category = req.query.category as string;
      const images = category
        ? await storage.getGalleryImagesByCategory(category)
        : await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  // Contact Submissions API
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Initialize database with sample data
  app.post("/api/init-data", async (req, res) => {
    try {
      // Initialize floor plans
      const floorPlansData = [
        {
          name: "Maple",
          bedrooms: 1,
          bathrooms: 1,
          sqft: 600,
          startingPrice: 1049,
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/The-Grove-at-Deerwood_Maple_web-1024x768-1.jpg",
          description: "Cozy one-bedroom apartment with modern amenities"
        },
        {
          name: "Cypress",
          bedrooms: 1,
          bathrooms: 1,
          sqft: 700,
          startingPrice: 1149,
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/The-Grove-at-Deerwood_Cypress_web-1024x768-1.jpg",
          description: "Spacious one-bedroom with enhanced layout"
        },
        {
          name: "Dogwood",
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1000,
          startingPrice: 1399,
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/The-Grove-at-Deerwood_Dogwood_web-1024x768-1.jpg",
          description: "Two-bedroom, two-bathroom apartment home"
        },
        {
          name: "Summit",
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1200,
          startingPrice: 2295,
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2016/11/Summit_Summit.jpg",
          description: "Premium three-bedroom apartment with luxury features"
        }
      ];

      for (const plan of floorPlansData) {
        await storage.createFloorPlan(plan);
      }

      // Initialize amenities
      const amenitiesData = [
        { name: "Two resort style pools", category: "property", icon: "fas fa-swimming-pool" },
        { name: "Lighted tennis courts", category: "property", icon: "fas fa-tennis-ball" },
        { name: "Large stocked lake with waterfront views", category: "property", icon: "fas fa-water" },
        { name: "Two laundry centers", category: "property", icon: "fas fa-washer" },
        { name: "24-hour emergency maintenance", category: "property", icon: "fas fa-tools" },
        { name: "WiFi available at clubhouse pool", category: "property", icon: "fas fa-wifi" },
        { name: "One and Two Bedroom Floor Plans", category: "apartment", icon: "fas fa-home" },
        { name: "Washer/Dryer connections in select units", category: "apartment", icon: "fas fa-washer" },
        { name: "Vaulted Ceilings (second Floor)", category: "apartment", icon: "fas fa-arrows-alt-v" },
        { name: "Fireplaces available (select apartments)", category: "apartment", icon: "fas fa-fire" },
        { name: "Private patio/balcony", category: "apartment", icon: "fas fa-door-open" },
        { name: "Spacious kitchens and walk-in closets", category: "apartment", icon: "fas fa-utensils" }
      ];

      for (const amenity of amenitiesData) {
        await storage.createAmenity(amenity);
      }

      // Initialize gallery images
      const galleryData = [
        {
          title: "Modern Living Room",
          description: "Spacious living area with modern furnishings",
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/grove-interior3-800w.jpg",
          category: "interior",
          featured: true
        },
        {
          title: "Resort-Style Pool",
          description: "Beautiful pool area with sun deck",
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/grove-pool2-800w.jpg",
          category: "pool",
          featured: true
        },
        {
          title: "Modern Kitchen",
          description: "Fully equipped kitchen with modern appliances",
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/grove-interior4-800w.jpg",
          category: "interior"
        },
        {
          title: "Comfortable Bedroom",
          description: "Spacious bedroom with large windows",
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/grove-interior5-800w.jpg",
          category: "interior"
        },
        {
          title: "Pool Lounge Area",
          description: "Relaxing pool area with comfortable seating",
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/grove-pool4-800w.jpg",
          category: "pool"
        },
        {
          title: "Modern Bathroom",
          description: "Elegant bathroom with modern fixtures",
          imageUrl: "https://www.thegroveaptsfl.com/wp-content/uploads/2020/04/grove-interior6-800w.jpg",
          category: "interior"
        }
      ];

      for (const image of galleryData) {
        await storage.createGalleryImage(image);
      }

      res.json({ message: "Database initialized successfully" });
    } catch (error) {
      console.error("Error initializing database:", error);
      res.status(500).json({ error: "Failed to initialize database" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
