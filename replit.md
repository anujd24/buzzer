# Product Complaint & Purchase Landing Page

## Overview

This is a full-stack web application for a product landing page with dual functionality: collecting customer complaints and processing product orders. Built with React (Vite) on the frontend and Express.js on the backend, the application provides a clean, accessible interface following modern SaaS design principles inspired by Stripe and Shopify. The application uses a PostgreSQL database (via Neon) with Drizzle ORM for data persistence, and shadcn/ui components for a consistent, professional user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as the build tool and dev server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management
- shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for styling with custom design tokens

**Design System:**
- Typography: Inter font family (via Google Fonts) for both headings and body text
- Color system: HSL-based custom properties supporting light/dark modes
- Spacing: Consistent Tailwind spacing scale (4, 6, 8, 12, 16, 20, 24)
- Components: Radix UI primitives wrapped with custom styling for accessibility
- Form handling: React Hook Form with Zod validation resolver

**Page Structure:**
- Home page (`/`): Product information section + complaint submission form
- Buy page (`/buy`): Product purchase form with quantity selection
- Fixed navigation bar with mobile-responsive hamburger menu
- Toast notifications for user feedback on form submissions

**State Management:**
- Server state managed by TanStack Query with custom fetch wrappers
- Form state handled by React Hook Form
- No global client state management (Redux/Zustand) - intentionally simple
- Query client configured with infinite stale time and disabled auto-refetching

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- HTTP server creation via Node's built-in `http` module
- Development mode uses Vite middleware for HMR
- Production mode serves static files from `dist/public`

**API Design:**
- RESTful endpoints under `/api` prefix
- POST `/api/complaints` - Create new complaint
- GET `/api/complaints` - Retrieve all complaints
- POST `/api/orders` - Create new order
- GET `/api/orders` - Retrieve all orders
- Request validation using Zod schemas before database operations
- Consistent error handling with proper HTTP status codes

**Request/Response Flow:**
- JSON body parsing with raw body preservation for webhook support
- URL-encoded form data support
- Structured logging with timestamps and source indicators
- Response time tracking for API endpoints

### Data Storage

**Database:**
- PostgreSQL database (hosted on Neon serverless platform)
- Connection via `@neondatabase/serverless` driver
- Database URL provided through `DATABASE_URL` environment variable

**ORM Layer:**
- Drizzle ORM for type-safe database operations
- Schema-first approach with TypeScript inference
- Zod integration via `drizzle-zod` for automatic validation schema generation
- Migration files stored in `./migrations` directory

**Data Models:**

1. **Complaints Table:**
   - id (varchar, primary key, auto-generated UUID)
   - name (text, required, min 2 characters)
   - phone (text, required, min 10 digits)
   - complaint (text, required, min 10 characters)

2. **Orders Table:**
   - id (varchar, primary key, auto-generated UUID)
   - name (text, required, min 2 characters)
   - phone (text, required, min 10 digits)
   - quantity (integer, required, min 1)

3. **Users Table:**
   - id (varchar, primary key)
   - username (text, unique, required)
   - password (text, required)
   - Note: User authentication not currently implemented in routes

**Storage Abstraction:**
- `IStorage` interface defines contract for data operations
- `MemStorage` class provides in-memory implementation for development
- Production implementation would swap to Drizzle-based storage
- UUID generation using Node's crypto module

### Build and Deployment

**Development Mode:**
- Vite dev server with HMR for client code
- tsx for running TypeScript server code directly
- Vite middleware integrated into Express for seamless development
- Replit-specific plugins for error overlay and cartographer

**Production Build:**
- Client: Vite builds to `dist/public` directory
- Server: esbuild bundles to `dist/index.cjs` as single CommonJS file
- Selective dependency bundling (allowlist) to reduce syscalls and improve cold start
- External dependencies excluded from bundle to leverage node_modules

**Build Optimization:**
- Server dependencies in allowlist are bundled for faster cold starts
- Source maps enabled for debugging
- Tree-shaking and minification applied
- Static asset optimization through Vite

### External Dependencies

**UI Component Libraries:**
- Radix UI: Unstyled, accessible component primitives (@radix-ui/* packages)
- shadcn/ui: Pre-styled components built on Radix with Tailwind CSS
- Lucide React: Icon library for consistent iconography
- class-variance-authority: Utility for creating variant-based component APIs
- cmdk: Command menu component (imported but may not be actively used)
- embla-carousel-react: Carousel/slider functionality

**Form & Validation:**
- React Hook Form: Form state management and validation
- Zod: Schema validation for both client and server
- @hookform/resolvers: Integrates Zod with React Hook Form

**Database & ORM:**
- @neondatabase/serverless: PostgreSQL driver for Neon platform
- Drizzle ORM: Type-safe database toolkit
- drizzle-kit: CLI for migrations and schema management
- drizzle-zod: Automatic Zod schema generation from Drizzle schemas

**Utilities:**
- date-fns: Date manipulation and formatting
- nanoid: Compact unique ID generation
- clsx + tailwind-merge: Utility for merging Tailwind classes

**Development Tools:**
- TypeScript: Type safety across the stack
- Vite: Fast build tool and dev server
- esbuild: Fast JavaScript bundler for server code
- @replit/vite-plugin-*: Replit-specific development enhancements

**Session Management (Available but Unused):**
- express-session: Session middleware (imported but not configured)
- connect-pg-simple: PostgreSQL session store (imported but not configured)
- Note: Authentication/session functionality appears planned but not implemented