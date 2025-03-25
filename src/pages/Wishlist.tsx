
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to profile page
    navigate("/profile", { replace: true });
  }, [navigate]);

  return null; // This won't render as we're redirecting
}
