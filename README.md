# Booking Management Application

A modern booking management system built with Node.js and React, powered by Supabase for real-time database capabilities.

## Technology Stack

### Frontend
- **React.js** - A JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind
- **React Query (TanStack Query)** - Powerful data synchronization for React
- **date-fns** - Modern JavaScript date utility library
- **Wouter** - A minimal, yet powerful router for React applications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Supabase** - Open source Firebase alternative
  - Real-time database capabilities
  - Built-in authentication
  - Row level security

### Database
- **PostgreSQL** (via Supabase) - Open source relational database
- **Drizzle ORM** - TypeScript ORM with end-to-end type safety

### Development Tools
- **TypeScript** - JavaScript with syntax for types
- **ESLint** - Tool for identifying and fixing code issues
- **Zod** - TypeScript-first schema validation

## Features

- View all bookings in a mobile-friendly interface
- Filter bookings by status (All/Pending/Completed/Rejected)
- Mark bookings as completed or rejected
- Real-time updates using Supabase
- Responsive design for all screen sizes
- 12-hour time format display
- Modern, clean UI with shadcn components

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions and setup
│   │   └── pages/       # Page components
├── server/              # Backend Express application
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database interface
│   └── db.ts           # Database connection
└── shared/             # Shared TypeScript types
    └── schema.ts       # Database schema definitions
```

## Environment Variables

The application requires the following environment variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase API key

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run dev`

## API Endpoints

- `GET /api/bookings` - Fetch all bookings
- `POST /api/bookings/:id/complete` - Mark a booking as completed
- `POST /api/bookings/:id/reject` - Mark a booking as rejected
