
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Check, Mail } from "lucide-react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      
      // Save subscription to localStorage
      try {
        const subscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]");
        subscriptions.push({ email, date: new Date().toISOString() });
        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
      } catch (error) {
        console.error("Error saving subscription:", error);
      }
      
      toast({
        title: "Subscribed successfully!",
        description: "You'll now receive our deal alerts and newsletters",
      });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="glass rounded-xl p-6 shadow-elegant">
      <div className="flex items-center mb-4 text-primary">
        <Mail className="h-5 w-5 mr-2" />
        <h3 className="font-semibold text-lg">Get Deal Alerts</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Subscribe to receive personalized deal alerts, price drop notifications, and exclusive offers.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || isSuccess}
            className="w-full pr-10"
          />
          {isSuccess && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : "Subscribe"}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          We respect your privacy and will never share your email.
        </p>
      </form>
    </div>
  );
}
