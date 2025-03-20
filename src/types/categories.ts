
import React from "react";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  count: number;
}
