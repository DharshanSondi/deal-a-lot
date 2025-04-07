
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function registerUser(email: string, password: string, name: string) {
  console.log("Attempting registration with:", email);
  
  try {
    // Sign up the user without captcha verification
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        // Important: Do not include captchaToken or emailRedirectTo
        // as these can trigger captcha verification requirements
      },
    });
    
    if (error) {
      console.error("Registration error:", error);
      
      if (error.message.includes("captcha")) {
        toast.error("Registration failed", {
          description: "Please try again later or contact support."
        });
      } else {
        toast.error("Registration failed", {
          description: error.message || "Please try again."
        });
      }
      
      throw error;
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
    
    // Handle specific error messages in a user-friendly way
    let errorMessage = "Registration failed. Please try again.";
    
    if (error.message.includes("duplicate key")) {
      errorMessage = "This email is already registered. Please login instead.";
    } else if (error.message.includes("captcha")) {
      errorMessage = "Registration service is temporarily unavailable. Please try again later.";
    }
    
    toast.error("Registration failed", {
      description: errorMessage
    });
    
    throw error;
  }
}
