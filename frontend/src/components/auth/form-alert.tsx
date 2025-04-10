
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FormAlertProps {
  message: string;
}

export function FormAlert({ message }: FormAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Alert variant="destructive" className="border-red-500/50 text-red-500">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
