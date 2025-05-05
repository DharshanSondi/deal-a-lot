
# Deploying DiscountHub on Render

This guide will help you deploy your DiscountHub application on Render.

## Prerequisites

1. A [Render](https://render.com/) account
2. Your repository pushed to GitHub, GitLab, or Bitbucket

## Deployment Steps

1. Log in to your Render account
2. Click on "New" and select "Web Service"
3. Connect your repository
4. Use the following settings:
   - **Name**: discount-hub (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist`
   - **Plan**: Select the appropriate plan (Free tier is available)

5. Set up environment variables:
   - `NODE_ENV`: production
   - `FLIPKART_AFFILIATE_ID`: Your Flipkart affiliate ID
   - `FLIPKART_AFFILIATE_TOKEN`: Your Flipkart affiliate token

6. Click "Create Web Service"

Your application will be deployed and available at the URL provided by Render.

## Supabase Configuration

If you're using Supabase:

1. Set up your Supabase project URL and anon key in your Render environment variables:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key

2. Deploy your Supabase Edge Functions:
   ```bash
   supabase functions deploy flipkart-all
   supabase functions deploy flipkart-dotd
   supabase functions deploy get-flipkart-offers
   ```

3. Set up your Flipkart affiliate credentials in Supabase:
   ```bash
   supabase secrets set FLIPKART_AFFILIATE_ID=your_affiliate_id
   supabase secrets set FLIPKART_AFFILIATE_TOKEN=your_affiliate_token
   ```
