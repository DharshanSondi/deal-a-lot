
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { FormAlert } from "./form-alert";
import { itemVariants } from "./animation-variants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      if (!form.name || !form.email || !form.password) {
        throw new Error("Please fill in all fields");
      }
      
      if (form.password !== form.confirmPassword) {
        setErrorMessage("Passwords do not match");
        throw new Error("Passwords do not match");
      }
      
      if (form.password.length < 6) {
        setErrorMessage("Password must be at least 6 characters");
        throw new Error("Password must be at least 6 characters");
      }
      
      console.log("Attempting registration with:", form.email);
      
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
          },
          // Set auto confirm to true to bypass email verification
          emailRedirectTo: window.location.origin,
          captchaToken: "disabled",
        },
      });
      
      if (error) {
        console.error("Registration error:", error);
        setErrorMessage(error.message || "Failed to register. Please try again.");
        throw error;
      }
      
      console.log("Registration response:", data);
      
      if (data?.user?.identities?.length === 0) {
        setErrorMessage("This email is already registered. Please login instead.");
        toast.error("Registration failed", {
          description: "This email is already registered. Please login instead."
        });
        onSuccess(); // Switch to login tab
      } else {
        toast.success("Registration successful", {
          description: "Your account has been created and you're now logged in."
        });
        
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        
        // Redirect to home page after successful registration
        navigate("/");
      }
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
        <Label htmlFor="register-name">Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-name"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </motion.div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-email"
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
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password (min. 6 characters)"
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
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="register-confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-confirm-password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </motion.div>
      
      <motion.div className="flex items-center space-x-2" variants={itemVariants}>
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          required
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </motion.div>

      <Button 
        type="submit" 
        className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : "Create Account"}
      </Button>
    </motion.form>
  );
}
