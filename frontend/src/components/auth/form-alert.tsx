
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
