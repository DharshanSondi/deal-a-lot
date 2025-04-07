
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants } from "../animation-variants";

interface FormFieldsProps {
  form: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
}

export function FormFields({ 
  form, 
  showPassword, 
  handleChange, 
  togglePasswordVisibility 
}: FormFieldsProps) {
  return (
    <>
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
            onClick={togglePasswordVisibility}
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
    </>
  );
}
