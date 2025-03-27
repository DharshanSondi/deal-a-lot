import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, EyeOff, Eye, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialAuthInProgress, setSocialAuthInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast: shadcnToast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    clearError();
  }, [isLogin, loginForm.email, loginForm.password, registerForm.email, registerForm.password]);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("Session found:", data.session);
          toast.success("Login successful", {
            description: "Welcome to DiscountHub!"
          });
          navigate("/");
        } else if (error && window.location.hash.includes("error")) {
          console.error("Auth redirect error:", error);
          toast.error("Authentication failed", {
            description: error.message || "Please try again"
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
            description: "Welcome to DiscountHub!"
          });
          navigate("/");
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    
    try {
      if (isLogin) {
        if (!loginForm.email || !loginForm.password) {
          throw new Error("Please fill in all fields");
        }
        
        console.log("Attempting login with:", loginForm.email);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginForm.email,
          password: loginForm.password,
        });
        
        if (error) {
          console.error("Login error:", error);
          if (error.message.includes("Invalid login credentials")) {
            setErrorMessage("The email or password you entered is incorrect. Please try again.");
          } else {
            setErrorMessage(error.message || "Failed to login. Please try again.");
          }
          throw error;
        }
        
        console.log("Login successful:", data);
        toast.success("Login successful", {
          description: "Welcome back to DiscountHub!"
        });

        navigate("/");
      } else {
        if (!registerForm.name || !registerForm.email || !registerForm.password) {
          throw new Error("Please fill in all fields");
        }
        
        if (registerForm.password !== registerForm.confirmPassword) {
          setErrorMessage("Passwords do not match");
          throw new Error("Passwords do not match");
        }
        
        if (registerForm.password.length < 6) {
          setErrorMessage("Password must be at least 6 characters");
          throw new Error("Password must be at least 6 characters");
        }
        
        console.log("Attempting registration with:", registerForm.email);
        
        const { data, error } = await supabase.auth.signUp({
          email: registerForm.email,
          password: registerForm.password,
          options: {
            data: {
              full_name: registerForm.name,
            },
          },
        });
        
        if (error) {
          console.error("Registration error:", error);
          setErrorMessage(error.message || "Failed to register. Please try again.");
          throw error;
        }
        
        console.log("Registration response:", data);
        
        if (data?.user?.identities?.length === 0) {
          setErrorMessage("This email is already registered. Please login instead.");
          toast.error("Registration failed", {
            description: "This email is already registered. Please login instead."
          });
          setIsLogin(true);
        } else {
          toast.success("Registration successful", {
            description: "Your account has been created. You may need to verify your email before logging in."
          });
          
          setRegisterForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error("Authentication failed", {
        description: errorMessage || error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    try {
      setSocialAuthInProgress(true);
      clearError();
      
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
      setSocialAuthInProgress(false);
    }
  };

  return (
    <Card className="glass border-0 shadow-elegant mx-auto w-full max-w-md">
      <Tabs defaultValue="login" value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <AnimatePresence mode="wait">
            <motion.form 
              onSubmit={handleSubmit}
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
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <div className="flex justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      className="pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300" 
                  disabled={isLoading || socialAuthInProgress}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : "Sign In"}
                </Button>
                <div className="relative mt-6 w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <motion.div 
                  className="mt-4 grid grid-cols-2 gap-2 w-full"
                  variants={itemVariants}
                >
                  <Button 
                    variant="outline" 
                    className="rounded-full" 
                    type="button"
                    onClick={() => handleSocialAuth('google')}
                    disabled={isLoading || socialAuthInProgress}
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
                    disabled={isLoading || socialAuthInProgress}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 mr-2 text-[#1877F2]">
                      <path fill="#1877F2" d="M15 8a7 7 0 0 0-7-7 7 7 0 0 0-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.141.54-1.141 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0 0 15 8z" />
                      <path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.272-1.093 1.141-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 0 0 2.188 0v-4.892h1.63z" />
                    </svg>
                    Facebook
                  </Button>
                </motion.div>
              </CardFooter>
            </motion.form>
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="register">
          <AnimatePresence mode="wait">
            <motion.form 
              onSubmit={handleSubmit}
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
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="register-name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="Your full name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password (min. 6 characters)"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      className="pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-2" variants={itemVariants}>
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </label>
                </motion.div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  disabled={isLoading || socialAuthInProgress}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : "Create Account"}
                </Button>
                <div className="relative mt-2 w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>
                <motion.div 
                  className="grid grid-cols-2 gap-2 w-full"
                  variants={itemVariants}
                >
                  <Button 
                    variant="outline" 
                    className="rounded-full" 
                    type="button"
                    onClick={() => handleSocialAuth('google')}
                    disabled={isLoading || socialAuthInProgress}
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
                    disabled={isLoading || socialAuthInProgress}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 mr-2 text-[#1877F2]">
                      <path fill="#1877F2" d="M15 8a7 7 0 0 0-7-7 7 7 0 0 0-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.141.54-1.141 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0 0 15 8z" />
                      <path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.272-1.093 1.141-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 0 0 2.188 0v-4.892h1.63z" />
                    </svg>
                    Facebook
                  </Button>
                </motion.div>
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
            </motion.form>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
