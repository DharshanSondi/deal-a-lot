
import { NavLink } from "./nav-link";

interface DesktopNavProps {
  location: { pathname: string };
}

export function DesktopNav({ location }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <NavLink 
        href="/"
        label="Home"
        isActive={location.pathname === '/'}
      />
      <NavLink 
        href="/deals"
        label="Deals"
        isActive={location.pathname === '/deals'}
      />
      <NavLink 
        href="/categories"
        label="Categories"
        isActive={location.pathname === '/categories'}
      />
      <NavLink 
        href="/compare"
        label="Compare"
        isActive={location.pathname === '/compare'}
      />
    </nav>
  );
}
