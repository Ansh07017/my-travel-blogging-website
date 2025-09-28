WanderNestle Travel Blog
Overview
WanderNestle is a travel blogging platform that enables users to share their travel memories and discover amazing destinations. The application provides a comprehensive experience for travel enthusiasts to create, share, and explore travel content including blogs, photos, and videos. The platform features a modern dark-themed interface inspired by travel and lifestyle platforms like Airbnb, emphasizing visual storytelling and immersive user experiences.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
Framework: React 18 with TypeScript for type safety and modern development practices
Routing: Wouter for lightweight client-side routing with support for home page and blog creation
Styling: Tailwind CSS with custom dark theme configuration, featuring a sophisticated color palette with primary colors (#222 background, #333 elevated surfaces, #3867d6 brand accent)
UI Components: Comprehensive component library using Radix UI primitives with shadcn/ui styling system for consistency and accessibility
State Management: TanStack Query (React Query) for server state management with optimistic updates and caching
Typography: Nunito font family from Google Fonts, providing modern, readable sans-serif typography perfect for travel content
Backend Architecture
Runtime: Node.js with Express.js server framework
Language: TypeScript with ES modules for modern JavaScript features
API Design: RESTful API endpoints following conventional HTTP methods (GET, POST, PUT, DELETE)
Development Setup: Vite for fast development with hot module replacement and build optimization
Session Management: Express sessions with PostgreSQL session store using connect-pg-simple
Data Storage Solutions
Database: PostgreSQL as the primary database with Neon serverless hosting
ORM: Drizzle ORM for type-safe database operations and schema management
Schema Design:
Users table with username/password authentication
Blog posts table with comprehensive fields (title, content, excerpt, author, destination, imageUrl, tags, timestamps)
UUID primary keys for scalability and security
Development Storage: In-memory storage implementation for development and testing environments
Content Management
Blog System: Full CRUD operations for travel blog posts with rich content support
Media Handling: Image URL storage with support for travel destination imagery
Tagging System: Array-based tag system for categorizing and discovering content
Content Structure: Structured blog posts with titles, excerpts, full content, author attribution, and destination tracking
Visual Design System
Component Architecture: Modular section-based layout (Hero, Services, About, Gallery, Pricing, Reviews, Contact)
Interactive Elements: Image slider with Swiper.js integration, hover effects, and smooth animations
Navigation: Fixed header with smooth scroll navigation and responsive mobile menu
Layout System: CSS Grid and Flexbox with responsive design patterns using rem-based spacing units
External Dependencies
Database & Storage
Neon Database: Serverless PostgreSQL hosting with connection pooling
Drizzle Kit: Database migrations and schema management tools
UI & Styling
Radix UI: Comprehensive collection of accessible, unstyled UI primitives
Tailwind CSS: Utility-first CSS framework with custom configuration
Lucide React: Modern icon library for consistent iconography
Google Fonts: Web font service for Nunito typography
Development & Build Tools
Vite: Fast build tool and development server with React plugin
Replit Integration: Development environment plugins for cartographer and dev banner
ESBuild: Fast JavaScript bundler for production builds
PostCSS: CSS processing with Tailwind and Autoprefixer plugins
Form & Data Management
React Hook Form: Performant form library with validation support
Zod: TypeScript-first schema validation for runtime type checking
TanStack Query: Powerful data synchronization and caching library
Development Environment
TypeScript: Static type checking with modern compiler options
Path Aliasing: Simplified imports using @ and @shared path mapping
Hot Reloading: Development server with instant updates and error overlays
