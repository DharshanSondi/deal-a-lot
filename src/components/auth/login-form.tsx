
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { FormAlert } from "./form-alert";
import { itemVariants } from "./animation-variants";
import { toast } from "sonner";

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!form.email || !form.password) {
        throw new Error("Please fill in all fields");
      }
      
      console.log("Attempting login with:", form.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      
      if (error) {
        console.error("Login error:", error);
        if (error.message.includes("Invalid login credentials")) {
          setErrorMessage("The email or password you entered is incorrect. Please try again.");
        } else {
          setErrorMessage(error.message || "Failed to login. Please try again.");
        }
        throw error;
      }
      
      console.log("Login successful:", data);
      toast.success("Login successful", {
        description: "Welcome back to DiscountHub!"
      });

      onSuccess();
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error("Authentication failed", {
        description: errorMessage || error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {errorMessage && (
        <FormAlert message={errorMessage} />
      )}
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={form.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </motion.div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <div className="flex justify-between">
          <Label htmlFor="login-password">Password</Label>
          <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            className="pl-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </motion.div>

      <Button 
        type="submit" 
        className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : "Sign In"}
      </Button>
    </motion.form>
  );
}
