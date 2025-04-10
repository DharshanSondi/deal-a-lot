
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavLink({ href, label, icon, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-full transition-all duration-300",
        "hover:bg-secondary/80 focus-ring",
        isActive 
          ? "bg-secondary font-medium text-foreground" 
          : "text-foreground/70"
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
}
