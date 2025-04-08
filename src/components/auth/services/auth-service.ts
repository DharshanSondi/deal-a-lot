
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function registerUser(email: string, password: string, name: string) {
  console.log("Attempting registration with:", email);
  
  try {
    // Use a simplified signup approach without captcha
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: window.location.origin,
        captchaToken: null // Explicitly tell Supabase not to use captcha
      },
    });
    
    if (error) {
      console.error("Registration error:", error);
      
      // Handle error messages in a user-friendly way
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.message.includes("email") && error.message.includes("taken")) {
        errorMessage = "This email is already registered. Please login instead.";
        toast.error("Registration failed", {
          description: errorMessage
        });
        return { isExistingUser: true, data };
      } else {
        toast.error("Registration failed", {
          description: error.message || "Please try again."
        });
      }
      
      throw new Error(errorMessage);
    }
    
    console.log("Registration response:", data);
    
    // Check if email already exists
    if (data?.user?.identities?.length === 0) {
      toast.error("Registration failed", {
        description: "This email is already registered. Please login instead."
      });
      return { isExistingUser: true, data };
    }
    
    toast.success("Registration successful", {
      description: "Your account has been created and you're now logged in."
    });
    
    return { isExistingUser: false, data };
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error;
  }
}
