
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FormAlert } from "./form-alert";
import { FormFields } from "./register-form/FormFields";
import { TermsCheckbox } from "./register-form/TermsCheckbox";
import { SubmitButton } from "./register-form/SubmitButton";
import { validateRegistration } from "./utils/validation";
import { registerUser } from "./services/auth-service";

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(true); // Default to true for automatic acceptance
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Validate form
      const validationError = validateRegistration(form);
      if (validationError) {
        setErrorMessage(validationError);
        setIsLoading(false);
        return;
      }
      
      // Make sure terms are always accepted
      if (!termsAccepted) {
        setTermsAccepted(true);
      }
      
      // Register user
      const { isExistingUser } = await registerUser(form.email, form.password, form.name);
      
      if (isExistingUser) {
        onSuccess(); // Switch to login tab
      } else {
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
      setErrorMessage(error.message || "Registration failed. Please try again.");
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
      
      <FormFields 
        form={form}
        showPassword={showPassword}
        handleChange={handleChange}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      
      <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />
      
      <SubmitButton isLoading={isLoading} />
    </motion.form>
  );
}
