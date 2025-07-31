## Prerequisites

- Node.js (Latest LTS version)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/topzdev/rsvp-tracker.git
   cd rsvp-tracker
   ```

2. Install Frontend Dependencies

   ```bash
   cd frontend
   npm install
   ```

3. Install Backend Dependencies

   ```bash
   cd ../backend
   npm install
   ```

4. Setup Database

   ```bash
   # Run migrations
   node ace migration:run

   # If database is messed up just run
   node ace migration:fresh
   ```

## Running the Application

1. Start the Backend Server

   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the Frontend Server
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3333

## Tech Stack

### Frontend

- **TypeScript** - For type-safe code
- **React** - UI library
- **Next.js** - React framework for routing and server-side rendering
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn** - Component library for consistent UI design

I chose Next.js to handle routing efficiently, while Shadcn and Tailwind CSS provide a robust foundation for component development and streamlined layout design.

### Backend

- **TypeScript** - For type-safe code
- **Node.js** - Runtime environment
- **AdonisJS** - Full-featured MVC framework with built-in ORM
- **SQLite** - Database (default)

I selected AdonisJS for the API because it comes with a built-in ORM/Active Record pattern, making data fetching and manipulation straightforward. Its migration system also simplifies database management.

## Design and Architectural Decisions

### Planning Approach

#### Development Strategy

- Started with planning and breaking down the core features and functionality needed for the app
- Skipped mockup creation since designs were already provided
- Identified the core data model needed for the application

#### API-First Development

- Implemented the backend API endpoints first before starting frontend development
- This approach helps in:
  - Establishing a clear contract between frontend and backend
  - Early identification of data requirements
  - Better understanding of the application flow
- When encountering API issues or missing features:
  - Added them to the backlog for later implementation
  - Continued with frontend development using the existing API endpoints
  - Returned to fix and enhance API endpoints after completing related features
  - This iterative approach helped maintain development momentum while ensuring comprehensive feature implementation

#### Frontend Development Strategy

- Adopted a mobile-first approach despite design not being a primary focus:
  - Started with mobile layouts first, then scaled up to larger screens
  - Used Tailwind's responsive breakpoints for consistent scaling
  - Focused on core functionality while maintaining basic responsiveness
  - This approach ensures the app remains usable on all devices without overcomplicating the design
- Utilized Shadcn and Tailwind for:
  - Quick implementation of responsive components
  - Basic but functional design patterns
  - Consistent user experience across different screen sizes

### Data Model: Event

```typescript
{
  name: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  max_guest: number;
  guest_count: number;
  username: string;
}
```

### API Architecture

#### Authentication Required Endpoints

- `[POST] /events` - Create a new record of event
- `[GET] /events/:id` - Get the single event by id
- `[PUT] /events/:id` - Update event information
- `[DELETE] /events/:id` - Delete user selected event
- `[GET] /user/events` - Get the logged in user events
- `[PUT] /events/:id/rsvp` - Increase the guest count of the event

#### Public Endpoints

- `[GET] /events` - Get the public events

## Limitations and Improvements

1. Email notifications for RSVPs
2. Calendar integration
3. Social media sharing
4. Guest list management features
5. Event categories and tags
6. Advanced search and filtering
