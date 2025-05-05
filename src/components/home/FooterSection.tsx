
import React from "react";
import { Link } from "react-router-dom";

export function FooterSection() {
  return (
    <footer className="py-12 bg-card">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 font-medium mb-4">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                DH
              </div>
              <span className="text-xl font-semibold">DiscountHub</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Aggregating the best deals from across the web to save you time and money.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/deals" className="text-muted-foreground hover:text-foreground">Deals</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
              <li><Link to="/compare" className="text-muted-foreground hover:text-foreground">Compare</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/electronics" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
              <li><Link to="/categories/fashion" className="text-muted-foreground hover:text-foreground">Fashion</Link></li>
              <li><Link to="/categories/home" className="text-muted-foreground hover:text-foreground">Home & Kitchen</Link></li>
              <li><Link to="/categories/beauty" className="text-muted-foreground hover:text-foreground">Beauty & Health</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: info@discounthub.com</li>
              <li className="text-muted-foreground">Phone: +91 1234567890</li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DiscountHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
