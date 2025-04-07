
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { SocialAuthButtons } from "./social-auth-buttons";
import { AuthDivider } from "./divider";
import { formVariants } from "./animation-variants";
import { toast } from "sonner";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [socialAuthInProgress, setSocialAuthInProgress] = useState(false);
  const navigate = useNavigate();

  // Check for auth state changes and handle redirects
  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("Session found:", data.session);
          toast.success("Login successful", {
            description: "Welcome to DiscountHub!",
          });
          navigate("/");
        } else if (error && window.location.hash.includes("error")) {
          console.error("Auth redirect error:", error);
          toast({
            variant: "destructive",
            title: "Authentication failed",
            description: error.message || "Please try again",
          });
        }
      } catch (err) {
        console.error("Error checking session:", err);
      }
    };

    handleAuthRedirect();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        if (event === 'SIGNED_IN' && session) {
          toast.success("Login successful", {
            description: "Welcome to DiscountHub!",
          });
          navigate("/");
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <Card className="glass border-0 shadow-elegant mx-auto w-full max-w-md">
      <Tabs defaultValue="login" value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <AnimatePresence mode="wait">
            <motion.div 
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="login-form"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LoginForm onSuccess={() => setIsLogin(true)} />
              </CardContent>
              <CardFooter className="flex flex-col">
                <AuthDivider text="Or continue with" />
                <div className="mt-4">
                  <SocialAuthButtons 
                    isLoading={isLoading || socialAuthInProgress}
                    onAuthStart={() => setSocialAuthInProgress(true)}
                  />
                </div>
              </CardFooter>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="register">
          <AnimatePresence mode="wait">
            <motion.div 
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="register-form"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                <CardDescription className="text-center">Enter your details to create your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RegisterForm onSuccess={() => setIsLogin(true)} />
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <AuthDivider text="Or sign up with" />
                <SocialAuthButtons 
                  isLoading={isLoading || socialAuthInProgress}
                  onAuthStart={() => setSocialAuthInProgress(true)}
                />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign in
                  </Button>
                </p>
              </CardFooter>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
