
import { motion } from "framer-motion";
import { itemVariants } from "../animation-variants";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <motion.div className="flex items-center space-x-2" variants={itemVariants}>
      <input
        type="checkbox"
        id="terms"
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
      />
      <label htmlFor="terms" className="text-sm text-muted-foreground">
        I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </label>
    </motion.div>
  );
}
