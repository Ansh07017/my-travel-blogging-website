import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, updateBlogPostSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog post routes
  
  // Get all blog posts
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getAllBlogPosts();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  // Get blog posts by author (must come before the :id route)
  app.get("/api/blogs/author/:author", async (req, res) => {
    try {
      const { author } = req.params;
      const blogs = await storage.getBlogPostsByAuthor(author);
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs by author:", error);
      res.status(500).json({ error: "Failed to fetch blogs by author" });
    }
  });

  // Get blog post by ID
  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await storage.getBlogPost(id);
      
      if (!blog) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });

  // Create new blog post
  app.post("/api/blogs", async (req, res) => {
    try {
      const validation = insertBlogPostSchema.safeParse(req.body);
      
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationError.message 
        });
      }

      const blog = await storage.createBlogPost(validation.data);
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ error: "Failed to create blog" });
    }
  });

  // Update blog post
  app.put("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validation = updateBlogPostSchema.safeParse(req.body);
      
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationError.message 
        });
      }

      const updatedBlog = await storage.updateBlogPost(id, validation.data);
      
      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(updatedBlog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  });

  // Delete blog post
  app.delete("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
