import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertGalleryImageSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendConfirmationEmail, testEmailConnection } from "./email";

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

  app.patch("/api/floor-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { startingPrice, promotionAvailable } = req.body;
      
      // Build updates object based on what fields are provided
      const updates: any = {};
      
      if (startingPrice !== undefined) {
        if (!startingPrice || startingPrice <= 0) {
          return res.status(400).json({ error: "Valid starting price is required" });
        }
        updates.startingPrice = startingPrice;
      }
      
      if (promotionAvailable !== undefined) {
        updates.promotionAvailable = promotionAvailable;
      }
      
      // Ensure at least one field is being updated
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
      }

      const updated = await storage.updateFloorPlan(id, updates);
      if (!updated) {
        return res.status(404).json({ error: "Floor plan not found" });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating floor plan:", error);
      res.status(500).json({ error: "Failed to update floor plan" });
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

  app.patch("/api/gallery/reorder", async (req, res) => {
    try {
      const { imageOrders } = req.body;
      
      if (!Array.isArray(imageOrders)) {
        return res.status(400).json({ error: "Image orders must be an array" });
      }

      await storage.updateGalleryImageOrder(imageOrders);
      res.json({ success: true });
    } catch (error) {
      console.error("Error reordering gallery images:", error);
      res.status(500).json({ error: "Failed to reorder gallery images" });
    }
  });

  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { category, filename } = req.body;
      
      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }

      const updated = await storage.updateGalleryImage(id, { category, filename });
      if (!updated) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating gallery image:", error);
      res.status(500).json({ error: "Failed to update gallery image" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGalleryImage(id);
      
      if (!success) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const galleryData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(galleryData);
      res.json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid gallery data", details: error.errors });
      }
      console.error("Error creating gallery image:", error);
      res.status(500).json({ error: "Failed to create gallery image" });
    }
  });

  // Admin Login API
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminPassword) {
        return res.status(500).json({ error: "Admin password not configured" });
      }
      
      if (password === adminPassword) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Contact Submissions API
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notifications
      try {
        // Send notification email to leasing team
        const notificationResult = await sendContactNotification(submission);
        if (notificationResult.success) {
          console.log('Notification email sent successfully');
        } else {
          console.error('Failed to send notification email:', notificationResult.error);
        }
        
        // Send confirmation email to visitor (disabled due to ProofPoint relay restrictions)
        // const confirmationResult = await sendConfirmationEmail(submission);
        // if (confirmationResult.success) {
        //   console.log('Confirmation email sent successfully');
        // } else {
        //   console.error('Failed to send confirmation email:', confirmationResult.error);
        // }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the API call if email fails
      }
      
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
          startingPrice: 1055,
          imageUrl: "/images/maple-floorplan.jpg",
          description: "Cozy one-bedroom apartment with modern amenities"
        },
        {
          name: "Cypress",
          bedrooms: 1,
          bathrooms: 1,
          sqft: 700,
          startingPrice: 1149,
          imageUrl: "/images/cypress-floorplan.jpg",
          description: "Spacious one-bedroom with enhanced layout"
        },
        {
          name: "Dogwood",
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1000,
          startingPrice: 1399,
          imageUrl: "/images/dogwood-floorplan.jpg",
          description: "Two-bedroom, two-bathroom apartment home"
        },
        {
          name: "Summit",
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1200,
          startingPrice: 2295,
          imageUrl: "/images/summit-floorplan.jpg",
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
          imageUrl: "/images/interior3.jpg",
          category: "interior",
          featured: true
        },
        {
          title: "Resort-Style Pool",
          description: "Beautiful pool area with sun deck",
          imageUrl: "/images/pool2.jpg",
          category: "pool",
          featured: true
        },
        {
          title: "Modern Kitchen",
          description: "Fully equipped kitchen with modern appliances",
          imageUrl: "/images/interior4.jpg",
          category: "interior"
        },
        {
          title: "Comfortable Bedroom",
          description: "Spacious bedroom with large windows",
          imageUrl: "/images/interior5.jpg",
          category: "interior"
        },
        {
          title: "Pool Lounge Area",
          description: "Relaxing pool area with comfortable seating",
          imageUrl: "/images/pool4.jpg",
          category: "pool"
        },
        {
          title: "Modern Bathroom",
          description: "Elegant bathroom with modern fixtures",
          imageUrl: "/images/interior6.jpg",
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

  // Test email connection endpoint
  app.get("/api/test-email", async (req, res) => {
    try {
      const result = await testEmailConnection();
      res.json(result);
    } catch (error) {
      console.error("Email connection test failed:", error);
      res.status(500).json({ error: "Email connection test failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
