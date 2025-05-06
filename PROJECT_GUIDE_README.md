
# DiscountHub Project Guide

This guide explains the structure of the DiscountHub codebase, detailing each folder and its purpose to help you understand how the application is organized.

## Project Overview

DiscountHub is a deal aggregator platform that collects and displays the best deals from various e-commerce platforms like Amazon, Flipkart, and Meesho. The application is built using React, TypeScript, Vite, and Tailwind CSS with a Supabase backend for authentication and data management.

## Frontend and Backend Architecture

DiscountHub uses a modern architecture with a clear separation between frontend and backend:

### Frontend (Client-Side)

The frontend code is primarily located in the `/src` directory. It consists of:

- React components for the user interface
- TypeScript for type-safe development
- Tailwind CSS for styling
- React Router for navigation
- Tanstack Query for data fetching and caching

### Backend (Server-Side)

DiscountHub uses a serverless architecture with Supabase as the backend:

1. **Supabase Backend**:
   - Located in the `/supabase` directory
   - Provides authentication, database, and serverless functions
   - Edge Functions (in `/supabase/functions`) handle server-side logic

2. **Connection Between Frontend and Backend**:
   - The frontend communicates with Supabase using the Supabase client
   - The client is configured in `/src/integrations/supabase/client.ts`
   - API endpoints are accessed through Supabase Edge Functions
   - Data flow: React components → API hooks → Supabase client → Supabase backend

## Folder Structure

### `/src` - Main Source Directory (Frontend)

The `/src` directory contains all the application source code.

#### `/src/assets` - Static Assets

- **Purpose**: Stores static assets like images, icons, and other media files.
- **Contents**:
  - `/images`: Contains all image files used throughout the application
  - `assets.js`: Exports all assets as a single object for easy imports

#### `/src/components` - UI Components

- **Purpose**: Contains all reusable React components organized by feature or functionality.
- **Subfolders**:

  - `/auth`: Authentication-related components
    - `/register-form`: Components specific to user registration
    - `/services`: Authentication service functions
    - `/utils`: Utility functions for authentication

  - `/categories`: Category browsing and display components
    - `CategoryCard.tsx`: Individual category card component
    - `CategoryDetail.tsx`: Detailed view of a specific category
    - `DealListItem.tsx`: Component for displaying a deal within a category
    - `FeaturedCategoryDeals.tsx`: Component for showcasing featured deals in a category

  - `/deals`: Deal discovery and display components
    - `DealsHeader.tsx`: Header component for deals pages
    - `DealsSearch.tsx`: Search functionality for deals
    - `DealsList.tsx`: Component for listing deals
    - `DealsFilter.tsx`: Filtering options for deals
    - `DealsActionBar.tsx`: Action buttons for deal pages
    - `DealsTabs.tsx`: Tab navigation for deals
    - `DealsTabContent.tsx`: Content for each deals tab

  - `/feedback`: User feedback components
    - `UserFeedback.tsx`: Component for collecting user feedback

  - `/home`: Homepage-specific components
    - `DealsSection.tsx`: Section displaying deals on the homepage
    - `FeaturesSection.tsx`: Section highlighting key features
    - `FooterSection.tsx`: Footer section of the homepage
    - `HeroSection.tsx`: Hero/banner section of the homepage
    - `NewsletterSection.tsx`: Newsletter subscription section

  - `/offers`: Offer-related components
    - `FlipkartOffers.tsx`: Component for displaying Flipkart offers

  - `/onboarding`: User onboarding components
    - `TourGuide.tsx`: Tour guide for new users

  - `/profile`: User profile components
    - `AvatarSelector.tsx`: Component for selecting user avatars

  - `/subscribe`: Subscription components
    - `subscribe-form.tsx`: Form for newsletter subscriptions

  - `/theme`: Theme management components
    - `theme-provider.tsx`: Context provider for theme settings
    - `theme-toggle.tsx`: Component for toggling between light/dark themes

  - `/ui`: Core UI components (Shadcn UI)
    - Multiple base UI components like buttons, inputs, cards, etc.
    - `deal-card.tsx`: Component for displaying individual deals
    - `navbar`: Components related to the navigation bar

#### `/src/data` - Mock Data

- **Purpose**: Contains mock data used for development and testing.
- **Contents**:
  - `mock-deals.ts`: Mock deal data
  - `categories.tsx`: Mock category data

#### `/src/hooks` - Custom React Hooks

- **Purpose**: Custom React hooks for reusable stateful logic.
- **Contents**:
  - `use-toast.ts`: Hook for displaying toast notifications
  - `useFlipkartOffers.ts`: Hook for fetching Flipkart offers data
  - `useDealsData.ts`: Hook for managing deals data

#### `/src/integrations` - External Service Integrations

- **Purpose**: Code for interacting with external services.
- **Subfolders**:
  - `/supabase`: Supabase integration
    - `client.ts`: Supabase client configuration
    - `types.ts`: TypeScript definitions for Supabase schema

#### `/src/lib` - Utility Libraries

- **Purpose**: Utility functions and libraries used across the application.
- **Contents**:
  - `utils.ts`: General utility functions

#### `/src/pages` - Application Pages

- **Purpose**: Components representing full pages in the application.
- **Contents**:
  - `Index.tsx`: Homepage
  - `AuthPage.tsx`: Authentication page (login/register)
  - `Categories.tsx`: Categories browsing page
  - `Compare.tsx`: Product comparison page
  - `ContactUs.tsx`: Contact page
  - `DealDetail.tsx`: Individual deal details page
  - `Deals.tsx`: Deals listing page
  - `HelpCenter.tsx`: Help and support page
  - `NotFound.tsx`: 404 page
  - `PrivacyPolicy.tsx`: Privacy policy page
  - `Profile.tsx`: User profile page
  - `Search.tsx`: Search results page
  - `Wishlist.tsx`: User wishlist page

#### `/src/types` - TypeScript Type Definitions

- **Purpose**: TypeScript interfaces and type definitions.
- **Contents**:
  - `categories.ts`: Types for category data
  - `deals.ts`: Types for deal data

#### `/src/utils` - Utility Functions

- **Purpose**: Utility functions organized by domain.
- **Subfolders**:
  - `/api`: API-related utilities
    - `deals.ts`: Deal API functions
    - `index.ts`: API base setup
    - `mock-deals.ts`: Functions for working with mock deal data

### `/supabase` - Supabase Backend

- **Purpose**: Contains Supabase configuration and serverless functions.
- **Subfolders**:
  - `/functions`: Supabase Edge Functions
    - `/flipkart-all`: Edge function for fetching all Flipkart offers
    - `/flipkart-dotd`: Edge function for fetching Flipkart deals of the day
    - `/get-flipkart-offers`: Combined edge function for Flipkart offers

### Frontend-Backend Integration Points

1. **Authentication Flow**:
   - Frontend components in `/src/components/auth` use authentication hooks
   - Authentication service in `/src/components/auth/services/auth-service.ts` communicates with Supabase
   - User data is stored in Supabase's `auth` schema

2. **Data Fetching**:
   - Custom hooks in `/src/hooks` (like `useFlipkartOffers.ts` and `useDealsData.ts`) fetch data
   - These hooks use the Supabase client to communicate with Edge Functions
   - Edge Functions in `/supabase/functions` handle external API calls and data processing

3. **API Layer**:
   - API utilities in `/src/utils/api` provide an abstraction layer for API calls
   - These utilities use the Supabase client to invoke Edge Functions
   - Edge Functions return processed data to the frontend

4. **User Data Flow**:
   - User actions trigger API calls through components and hooks
   - Data flows through the Supabase client to the appropriate Edge Function
   - Edge Functions process the request and return data to the frontend
   - Components update based on returned data

### Configuration Files

- `vite.config.ts`: Vite configuration
- `render.yaml`: Render deployment configuration
- `RENDER_DEPLOY_GUIDE.md`: Guide for deploying the application to Render
- `index.html`: Main HTML entry point
- `frontend/index.html`: Frontend HTML entry point for development
- `supabase/config.toml`: Configuration for Supabase Edge Functions

## Development Guidelines

### Component Structure

- Each component should be focused on a single responsibility
- Larger components should be broken down into smaller, more manageable parts
- Shared logic should be extracted to custom hooks

### State Management

- Local component state is managed with React's `useState` and `useEffect`
- Authentication state is managed through Supabase's authentication system
- Global state management is handled through contexts where needed

### Styling

- The application uses Tailwind CSS for styling
- Shadcn UI components provide consistent UI elements
- The "glass" class adds a glassmorphic effect to elements

### API Integration

- External API calls are proxied through Supabase Edge Functions
- Mock data is used as a fallback when API calls fail
- Data fetching is encapsulated in custom hooks

### Deployment

The application can be deployed to Render using the provided configuration:
1. Push the code to a Git repository
2. Set up a Render account
3. Connect your repository to Render
4. Configure the necessary environment variables

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. The application will be available at http://localhost:8080

## Contributing

When adding new features or components:
1. Follow the existing folder structure
2. Maintain consistent naming conventions
3. Write reusable components where possible
4. Keep files small and focused on a single responsibility
