
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function registerUser(email: string, password: string, name: string) {
  console.log("Attempting registration with:", email);
  
  try {
    // Check if user already exists - removed problematic profiles query
    // Instead, we'll check via auth signup response
    
    // Register new user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: window.location.origin,
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
        return { isExistingUser: true, data: null };
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
      return { isExistingUser: true, data: null };
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

export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Failed to login. Please try again.";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "The email or password you entered is incorrect. Please try again.";
      }
      
      toast.error("Login failed", {
        description: errorMessage
      });
      
      throw error;
    }

    toast.success("Login successful", {
      description: "Welcome back to DiscountHub!"
    });

    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    toast.info("Signed out successfully");
  } catch (error: any) {
    console.error("Logout error:", error);
    toast.error("Logout failed", {
      description: error.message || "Please try again"
    });
    throw error;
  }
}
