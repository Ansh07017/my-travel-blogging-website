🌍 WanderNestle – Travel Blog

WanderNestle is a modern travel blogging platform where users can share their memories, write about destinations, and explore content from other travel enthusiasts.
It’s designed with a dark, immersive theme to make travel stories more engaging and visually rich.

✨ Key Features

📝 Blog Creation – Write, edit, and share travel stories.

📸 Photo Galleries – Add destination images to your posts.

🎞️ Image Slider – Smooth animations and interactive visuals.

🔖 Tags & Categories – Discover posts by destinations or themes.

👤 User Accounts – Authentication and personalized profiles.

🚀 Modern Dark UI – Sleek design inspired by lifestyle apps like Airbnb.

📱 Responsive Layout – Works perfectly on mobile, tablet, and desktop.

🏗️ System Architecture
Frontend

Framework: React 18 + TypeScript

Routing: Wouter (lightweight client routing)

Styling: Tailwind CSS (custom dark theme) + shadcn/ui + Radix UI primitives

State Management: TanStack Query (data fetching & caching)

Typography: Nunito (Google Fonts)

Backend

Runtime: Node.js + Express.js

Language: TypeScript (ES Modules)

API: RESTful endpoints (GET, POST, PUT, DELETE)

Sessions: Express sessions with PostgreSQL store

Database

Primary DB: PostgreSQL (hosted on Neon)

ORM: Drizzle ORM with schema migrations

Schema Includes:

Users (username/password auth)

BlogPosts (title, content, excerpt, author, destination, imageUrl, tags, timestamps)

UUID primary keys

🎨 Visual Design

Layout: Modular sections (Hero, About, Gallery, Contact, etc.)

Navigation: Fixed header + smooth scroll + mobile menu

Interactive Elements: Swiper.js for sliders, hover effects, smooth animations

Grid/Flexbox: Responsive layout with rem-based spacing

⚙️ Development Setup
1. Clone the Repo
git clone https://github.com/Ansh07017/wandernestle-travel-blog.git
cd wandernestle-travel-blog

2. Install Dependencies
npm install

3. Setup Environment

Create a .env file in the root:

DATABASE_URL=your_neon_postgres_url
SESSION_SECRET=your_secret_key
PORT=5000

4. Run Development Server
npm run dev

5. Build for Production
npm run build
npm start

📦 External Dependencies

Database: PostgreSQL (Neon hosting) + Drizzle ORM + Drizzle Kit

Styling & UI: Tailwind CSS, Radix UI, shadcn/ui, Lucide React icons

Forms & Validation: React Hook Form + Zod

Data Fetching: TanStack Query

Build Tools: Vite, ESBuild, PostCSS, Autoprefixer

📚 Development Environment

TypeScript with strict checking

Path aliasing (@ and @shared) for clean imports

Hot reloading with Vite dev server

Replit integration for cloud dev

🌟 Future Enhancements

🌐 Multi-language support

🗺️ Interactive travel maps

📬 Newsletter & email subscriptions

🤝 Social features (comments, likes, follows)

🤝 Contributing

Fork this repo

Create a feature branch (feature/my-feature)

Commit and push your changes

Create a Pull Request

📜 License
This project is licensed under the MIT License.

This project is licensed under the MIT License.

👉 Do you want me to also create a shorter, beginner-friendly README (like your travel blog repo’s README) that’s less technical, for non-developer contributors?
