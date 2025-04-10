
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<{ isExistingUser: boolean }> => {
  try {
    // First check if the user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (checkError) throw checkError;

    // If user already exists, suggest login instead
    if (existingUsers && existingUsers.length > 0) {
      toast.info("Account already exists", {
        description: "Please sign in with your existing account"
      });
      return { isExistingUser: true };
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) throw error;

    // Show success message
    toast.success("Account created successfully", {
      description: "Welcome to DiscountHub!"
    });

    return { isExistingUser: false };
  } catch (error: any) {
    console.error("Registration error:", error);
    toast.error("Registration failed", {
      description: error.message || "Please try again"
    });
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    toast.success("Login successful", {
      description: "Welcome back to DiscountHub!"
    });

    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    toast.error("Login failed", {
      description: error.message || "Please check your credentials and try again"
    });
    throw error;
  }
};

export const logoutUser = async () => {
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
};
