
import { motion } from "framer-motion";
import { itemVariants } from "../animation-variants";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <motion.div className="flex items-start space-x-2" variants={itemVariants}>
      <Checkbox 
        id="terms" 
        checked={checked}
        onCheckedChange={onChange}
        className="mt-1"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I agree to the <a href="/privacy-policy" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>
    </motion.div>
  );
}
