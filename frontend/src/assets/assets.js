
// Logo and icons
import logo from './images/logo.png';
import add_icon from './images/add_icon.png';
import order_icon from './images/order_icon.png';
import profile_image from './images/profile_image.png';
import upload_area from './images/upload_area.png';
import parcel_icon from './images/parcel_icon.png';

// Base URL configuration - change this when deploying to different environments
export const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const currency = '₹';

// Export all assets in a single object for easier imports
export const assets = {
  logo,
  add_icon,
  order_icon,
  profile_image,
  upload_area,
  parcel_icon
};

// Helper function to get full URL for API endpoints
export const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

// Export individual assets for direct imports
export {
  logo,
  add_icon,
  order_icon,
  profile_image,
  upload_area,
  parcel_icon
};
