
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, EyeOff, Eye } from "lucide-react";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    
    try {
      // Mock authentication - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (isLogin) {
        // Validate login
        if (!loginForm.email || !loginForm.password) {
          throw new Error("Please fill in all fields");
        }
        
        // Mock successful login
        localStorage.setItem("user", JSON.stringify({ email: loginForm.email }));
        
        toast({
          title: "Login successful",
          description: "Welcome back to DiscountHub!",
        });
      } else {
        // Validate registration
        if (!registerForm.name || !registerForm.email || !registerForm.password) {
          throw new Error("Please fill in all fields");
        }
        
        if (registerForm.password !== registerForm.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        if (registerForm.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        
        // Mock successful registration and auto-login
        localStorage.setItem("user", JSON.stringify({ 
          name: registerForm.name,
          email: registerForm.email 
        }));
        
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
      }
      
      // Redirect to home page after successful auth
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full rounded-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
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
              <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="rounded-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 mr-2 text-[#4285F4]">
                    <path fill="#4285F4" d="M15.845 8.196c0-.541-.049-1.062-.139-1.564H8.096v2.955h4.351a3.728 3.728 0 0 1-1.613 2.442v2.03h2.61c1.525-1.405 2.401-3.473 2.401-5.863z" />
                    <path fill="#34A853" d="M8.096 16c2.188 0 4.01-.726 5.348-1.941l-2.61-2.03c-.725.483-1.647.77-2.738.77-2.106 0-3.891-1.422-4.529-3.334H.957v2.094A8.002 8.002 0 0 0 8.096 16z" />
                    <path fill="#FBBC05" d="M3.567 9.465a4.783 4.783 0 0 1-.252-1.514c0-.526.091-1.036.252-1.514V4.342H.957a8.02 8.02 0 0 0 0 7.218l2.61-2.095z" />
                    <path fill="#EA4335" d="M8.096 3.618c1.188 0 2.255.408 3.096 1.21l2.314-2.314C12.108.953 10.286.151 8.096.151A7.998 7.998 0 0 0 .957 4.342l2.61 2.095c.638-1.912 2.423-3.334 4.529-3.334z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="rounded-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4 mr-2">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">Enter your details to create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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
              </div>
              <div className="space-y-2">
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
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
