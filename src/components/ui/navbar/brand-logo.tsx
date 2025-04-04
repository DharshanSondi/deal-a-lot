
import { Link } from "react-router-dom";

export function BrandLogo() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 font-medium focus-ring rounded-md"
    >
      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
        DH
      </div>
      <span className="text-xl font-semibold tracking-tight">
        DiscountHub
      </span>
    </Link>
  );
}
