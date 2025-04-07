
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function registerUser(email: string, password: string, name: string) {
  console.log("Attempting registration with:", email);
  
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
}
