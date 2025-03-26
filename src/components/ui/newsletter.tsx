
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface NewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export function Newsletter({
  title = "Subscribe to Our Newsletter",
  description = "Get the latest deals and discounts right in your inbox",
  buttonText = "Subscribe",
  className = "",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to your newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      toast.success("Thank you for subscribing!", {
        description: "You'll start receiving our newsletter soon.",
      });
      
      // Store subscription in localStorage for persistence
      const subscribers = JSON.parse(localStorage.getItem("newsletter-subscribers") || "[]");
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("newsletter-subscribers", JSON.stringify(subscribers));
      }
      
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {isSuccess ? (
          <div className="bg-primary/10 text-primary p-4 rounded-lg">
            <p className="font-medium">Thank you for subscribing!</p>
            <p className="text-sm mt-1">You'll start receiving our newsletter soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="rounded-full"
            >
              {isSubmitting ? "Subscribing..." : buttonText}
            </Button>
          </form>
        )}
        
        <p className="text-xs text-muted-foreground mt-3">
          By subscribing, you agree to our <a href="#" className="underline hover:text-primary">Privacy Policy</a> and consent to receive updates from us.
        </p>
      </div>
    </div>
  );
}
