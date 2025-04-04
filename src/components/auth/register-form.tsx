
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
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

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
          emailRedirectTo: window.location.origin + '/auth',
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
        onSuccess();
      } else {
        // Show OTP verification form if needed
        if (data?.user && !data.session) {
          setIsVerifying(true);
          toast.info("Verification code sent", {
            description: "Please check your email for the verification code"
          });
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
          onSuccess();
        }
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

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: form.email,
        token: verificationCode,
        type: 'signup'
      });

      if (error) {
        throw error;
      }

      toast.success("Email verified", {
        description: "Your account has been verified and you're now logged in."
      });
      
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      onSuccess();
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error("Verification failed", {
        description: error.message || "Please check the code and try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">Verify your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to {form.email}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
          </div>

          <Button 
            onClick={handleVerifyOTP} 
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            disabled={isLoading || verificationCode.length < 6}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : "Verify Email"}
          </Button>

          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => setIsVerifying(false)}
              disabled={isLoading}
            >
              Go back to registration
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

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
