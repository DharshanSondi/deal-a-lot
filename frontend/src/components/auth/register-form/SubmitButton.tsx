
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants } from "../animation-variants";

interface SubmitButtonProps {
  isLoading: boolean;
}

export function SubmitButton({ isLoading }: SubmitButtonProps) {
  return (
    <motion.div variants={itemVariants}>
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
    </motion.div>
  );
}
