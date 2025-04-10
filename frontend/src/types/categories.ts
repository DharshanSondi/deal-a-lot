
import { ReactNode } from "react";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  image: string;
  count: number;
}
