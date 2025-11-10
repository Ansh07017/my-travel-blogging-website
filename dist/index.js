// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  blogPosts;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllBlogPosts() {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getBlogPost(id) {
    return this.blogPosts.get(id);
  }
  async getBlogPostsByAuthor(author) {
    return Array.from(this.blogPosts.values()).filter((post) => post.author === author).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createBlogPost(insertBlogPost) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const blogPost = {
      ...insertBlogPost,
      id,
      imageUrl: insertBlogPost.imageUrl || null,
      tags: insertBlogPost.tags || [],
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  async updateBlogPost(id, updateBlogPost) {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      return void 0;
    }
    const updatedPost = {
      ...existingPost,
      ...updateBlogPost,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  async deleteBlogPost(id) {
    return this.blogPosts.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull(),
  destination: text("destination").notNull(),
  imageUrl: text("image_url"),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateBlogPostSchema = insertBlogPostSchema.partial();

// server/routes.ts
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getAllBlogPosts();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });
  app2.get("/api/blogs/author/:author", async (req, res) => {
    try {
      const { author } = req.params;
      const blogs = await storage.getBlogPostsByAuthor(author);
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs by author:", error);
      res.status(500).json({ error: "Failed to fetch blogs by author" });
    }
  });
  app2.get("/api/blogs/:id", async (req, res) => {
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
  app2.post("/api/blogs", async (req, res) => {
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
  app2.put("/api/blogs/:id", async (req, res) => {
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
  app2.delete("/api/blogs/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig(async () => {
  const baseConfig = {
    base: "/my-travel-blogging-website/"
  };
  const replitPlugins = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
    (await import("@replit/vite-plugin-cartographer")).cartographer(),
    (await import("@replit/vite-plugin-dev-banner")).devBanner()
  ] : [];
  return {
    ...baseConfig,
    // Spread the base config here
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...replitPlugins
      // Include the loaded Replit plugins
    ],
    resolve: {
      alias: {
        // Ensure path resolution works correctly
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets")
      },
      dedupe: ["react", "react-dom"]
    },
    // Ensure the root and build output paths are correct
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        external: []
      }
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"]
      },
      host: "0.0.0.0",
      port: 5e3,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true
        }
      }
    }
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "localhost", () => {
    console.log(`\u2705 Server running on http://localhost:${port}`);
  });
})();
