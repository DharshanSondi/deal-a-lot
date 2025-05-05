
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast("Please enter a valid email address");
      return;
    }
    
    // Save subscription to localStorage (in a real app, this would be an API call)
    try {
      const subscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]");
      subscriptions.push({ email, date: new Date().toISOString() });
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
      
      toast("Subscribed successfully!", {
        description: "You'll now receive our deal alerts and newsletters"
      });
      
      setEmail("");
    } catch (error) {
      console.error("Error saving subscription:", error);
      toast("Failed to subscribe. Please try again later.");
    }
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="glass rounded-2xl shadow-elegant overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with the Best Deals
              </h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter and never miss out on the latest deals and discounts.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="rounded-full">Subscribe</Button>
              </form>
            </div>
            <div className="hidden md:block relative">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Newsletter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
