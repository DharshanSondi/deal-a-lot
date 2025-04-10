
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Settings, Bell, Heart, LogOut, AlertTriangle } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ThemeToggle } from "@/components/theme/theme-provider";
import { supabase } from "@/integrations/supabase/client";
import { mockDeals } from "@/data/mock-deals";
import { Deal } from "@/types/deals";
import { DealCard } from "@/components/ui/deal-card";

export default function Profile() {
  const [savedDeals, setSavedDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    notifications: {
      email: true,
      push: true,
      dealAlerts: true,
      priceDrops: true,
    },
    preferences: {
      currency: "INR",
      language: "English",
    }
  });

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
    
    // Check for current user
    const getUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        const userData = sessionData.session.user;
        setUser(prev => ({
          ...prev,
          name: userData.user_metadata?.full_name || userData.email?.split('@')[0] || "User",
          email: userData.email || "No email provided",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.user_metadata?.full_name || userData.email || "User"}`,
        }));
      }
    };
    
    getUser();
    
    // Simulate API fetch of saved deals
    setTimeout(() => {
      const savedDealIds = JSON.parse(localStorage.getItem("savedDeals") || "[]");
      const userSavedDeals = mockDeals.filter(deal => savedDealIds.includes(deal.id));
      setSavedDeals(userSavedDeals);
      setIsLoading(false);
      
      // Get user info from localStorage if available
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        try {
          const parsedUser = JSON.parse(userInfo);
          setUser(prev => ({
            ...prev,
            preferences: {
              currency: parsedUser.preferences?.currency || "INR",
              language: parsedUser.preferences?.language || "English",
            }
          }));
        } catch (error) {
          console.error("Error parsing user info:", error);
        }
      }
    }, 800);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully", {
        description: "You have been logged out of your account",
      });
      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out", {
        description: "Please try again",
      });
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setUser(prev => {
      const updatedUser = {
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: value
        }
      };
      
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return updatedUser;
    });
    
    toast.success("Settings updated", {
      description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update localStorage
    localStorage.setItem("user", JSON.stringify(user));
    
    toast.success("Profile updated", {
      description: "Your profile information has been updated",
    });
  };
  
  const handlePreferenceChange = (key: string, value: string) => {
    setUser(prev => {
      const updatedUser = {
        ...prev,
        preferences: {
          ...prev.preferences,
          [key]: value
        }
      };
      
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return updatedUser;
    });
    
    toast.success("Preference updated", {
      description: `Your ${key} has been set to ${value}`,
    });
  };
  
  const handleDeleteAccount = async () => {
    try {
      // In a real implementation, you would call a Supabase function to delete the user account
      // For now, we'll just simulate this by clearing localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("savedDeals");
      localStorage.removeItem("comparedProducts");
      
      toast.success("Account deleted", {
        description: "Your account and all associated data have been deleted",
      });
      
      // Redirect to home
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account", {
        description: "Please try again or contact support",
      });
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary/50">
              <img 
                src={user.avatar} 
                alt={user.name || "User"}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name || "Welcome!"}</h1>
              <p className="text-muted-foreground">{user.email || "No email provided"}</p>
            </div>
            <div className="md:ml-auto">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="saved" className="space-y-6">
                <TabsList className="glass backdrop-blur-sm">
                  <TabsTrigger value="saved" className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Deals
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="saved" className="space-y-6">
                  <h2 className="text-2xl font-bold">Saved Deals</h2>
                  
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
                      ))}
                    </div>
                  ) : savedDeals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedDeals.map(deal => (
                        <DealCard key={deal.id} {...deal} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 glass rounded-xl">
                      <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-medium mb-2">No saved deals yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start saving deals you like by clicking the heart icon
                      </p>
                      <Button asChild>
                        <a href="/deals">Browse Deals</a>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="account" className="space-y-6">
                  <h2 className="text-2xl font-bold">Account Information</h2>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6 glass p-6 rounded-xl">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Enter your email"
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" value="********" disabled />
                      <Button variant="link" size="sm" className="px-0 h-auto">
                        Change Password
                      </Button>
                    </div>
                    
                    <Button type="submit" className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <h2 className="text-2xl font-bold">Notification Settings</h2>
                  
                  <div className="glass p-6 rounded-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive deal updates via email</p>
                        </div>
                        <Switch 
                          checked={user.notifications.email}
                          onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                        </div>
                        <Switch 
                          checked={user.notifications.push}
                          onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Deal Alerts</h3>
                          <p className="text-sm text-muted-foreground">Get notified about new deals matching your interests</p>
                        </div>
                        <Switch 
                          checked={user.notifications.dealAlerts}
                          onCheckedChange={(checked) => handleNotificationChange('dealAlerts', checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Price Drop Alerts</h3>
                          <p className="text-sm text-muted-foreground">Get notified when prices drop for saved items</p>
                        </div>
                        <Switch 
                          checked={user.notifications.priceDrops}
                          onCheckedChange={(checked) => handleNotificationChange('priceDrops', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <h2 className="text-2xl font-bold">App Settings</h2>
                  
                  <div className="glass p-6 rounded-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Dark Mode</h3>
                          <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                        </div>
                        <ThemeToggle />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Language</h3>
                          <p className="text-sm text-muted-foreground">Select your preferred language</p>
                        </div>
                        <Select 
                          value={user.preferences.language} 
                          onValueChange={(value) => handlePreferenceChange('language', value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="Tamil">Tamil</SelectItem>
                            <SelectItem value="Bengali">Bengali</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Preferred Currency</h3>
                          <p className="text-sm text-muted-foreground">Select your preferred currency</p>
                        </div>
                        <Select 
                          value={user.preferences.currency} 
                          onValueChange={(value) => handlePreferenceChange('currency', value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                            <SelectItem value="GBP">British Pound (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center text-destructive">
                                <AlertTriangle className="h-5 w-5 mr-2" />
                                Delete Account
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove all your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleDeleteAccount}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <span className="text-sm font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Saved Deals</span>
                    <span className="text-sm font-medium">{savedDeals.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deal Alerts</span>
                    <span className="text-sm font-medium">{user.notifications.dealAlerts ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Get More From DiscountHub</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade to Pro for exclusive deals, advanced price alerts, and more.
                </p>
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
