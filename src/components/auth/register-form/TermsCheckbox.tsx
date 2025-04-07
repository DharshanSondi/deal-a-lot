
import { motion } from "framer-motion";
import { itemVariants } from "../animation-variants";
import { useState } from "react";

export function TermsCheckbox() {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <motion.div className="flex items-center space-x-2" variants={itemVariants}>
      <input
        type="checkbox"
        id="terms"
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        required
      />
      <label htmlFor="terms" className="text-sm text-muted-foreground">
        I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </label>
    </motion.div>
  );
}
