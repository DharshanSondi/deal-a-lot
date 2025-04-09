
# DiscountHub - Deal Finder App

DiscountHub aggregates the best deals from Amazon, Flipkart, Meesho and more to help you save time and money on your online shopping.

## Project Structure

The project is divided into two main parts:

- **frontend**: React application built with Vite, TypeScript, and Tailwind CSS
- **backend**: Supabase functions and configuration

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:8080

### Backend Development

The backend uses Supabase for authentication, database, and serverless functions.

#### Local Supabase Development

1. Install Supabase CLI
2. Start local Supabase instance:

```bash
supabase start
```

## Deployment Options

### Frontend Deployment

The project includes configuration files for multiple deployment platforms:

- **Netlify**: Use the `netlify.toml` configuration
- **Vercel**: Use the `vercel.json` configuration
- **Firebase**: Use the `firebase.json` configuration
- **Docker**: Use the included `Dockerfile` and `nginx.conf`

### Backend Deployment

Deploy Supabase functions using the Supabase CLI:

```bash
supabase functions deploy
```

## Docker Deployment

To run both frontend and backend using Docker:

```bash
docker-compose up
```

## Authentication

The app uses Supabase Authentication with:
- Email/Password sign up and login
- Google OAuth integration

## License

MIT
