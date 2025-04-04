
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { itemVariants } from "./animation-variants";

interface SocialAuthButtonsProps {
  isLoading: boolean;
  onAuthStart: () => void;
}

export function SocialAuthButtons({ isLoading, onAuthStart }: SocialAuthButtonsProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    try {
      onAuthStart();
      setErrorMessage(null);
      
      console.log(`Attempting ${provider} login`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });
      
      if (error) {
        console.error(`${provider} auth error:`, error);
        setErrorMessage(`${provider} authentication failed: ${error.message}`);
        throw error;
      }
      
      console.log(`${provider} auth initiated:`, data);
    } catch (error: any) {
      console.error(`${provider} auth failed:`, error);
      toast.error("Authentication failed", {
        description: error.message || "Please try again"
      });
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 gap-2 w-full"
      variants={itemVariants}
    >
      <Button 
        variant="outline" 
        className="rounded-full" 
        type="button"
        onClick={() => handleSocialAuth('google')}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 mr-2 text-[#4285F4]">
          <path fill="#4285F4" d="M15.845 8.196c0-.541-.049-1.062-.139-1.564H8.096v2.955h4.351a3.728 3.728 0 0 1-1.613 2.442v2.03h2.61c1.525-1.405 2.401-3.473 2.401-5.863z" />
          <path fill="#34A853" d="M8.096 16c2.188 0 4.01-.726 5.348-1.941l-2.61-2.03c-.725.483-1.647.77-2.738.77-2.106 0-3.891-1.422-4.529-3.334H.957v2.094A8.002 8.002 0 0 0 8.096 16z" />
          <path fill="#FBBC05" d="M3.567 9.465a4.783 4.783 0 0 1-.252-1.514c0-.526.091-1.036.252-1.514V4.342H.957a8.02 8.02 0 0 0 0 7.218l2.61-2.095z" />
          <path fill="#EA4335" d="M8.096 3.618c1.188 0 2.255.408 3.096 1.21l2.314-2.314C12.108.953 10.286.151 8.096.151A7.998 7.998 0 0 0 .957 4.342l2.61 2.095c.638-1.912 2.423-3.334 4.529-3.334z" />
        </svg>
        Google
      </Button>
      <Button 
        variant="outline" 
        className="rounded-full" 
        type="button"
        onClick={() => handleSocialAuth('facebook')}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 mr-2 text-[#1877F2]">
          <path fill="#1877F2" d="M15 8a7 7 0 0 0-7-7 7 7 0 0 0-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.141.54-1.141 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0 0 15 8z" />
          <path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.272-1.093 1.141-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 0 0 2.188 0v-4.892h1.63z" />
        </svg>
        Facebook
      </Button>
    </motion.div>
  );
}
