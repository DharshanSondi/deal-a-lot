
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { DealCard } from "@/components/ui/deal-card";
import { mockDeals } from "@/data/mock-deals";
import { Deal } from "@/types/deals";
import { toast } from "@/hooks/use-toast";
import { User, Settings, Bell, Heart, LogOut } from "lucide-react";

export default function Profile() {
  const [savedDeals, setSavedDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    notifications: {
      email: true,
      push: true,
      dealAlerts: true,
      priceDrops: true,
    }
  });

  useEffect(() => {
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
            name: parsedUser.name || "User",
            email: parsedUser.email || "user@example.com",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.name || "User"}`
          }));
        } catch (error) {
          console.error("Error parsing user info:", error);
        }
      }
    }, 800);
  }, []);

  const handleLogout = () => {
    // Simulate logout
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    // In a real app, redirect to home page
    window.location.href = "/";
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
    
    toast({
      title: "Settings updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated",
    });
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-xl glass shadow-elegant animate-pulse h-[360px]" />
                  ))}
                </div>
              ) : savedDeals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              
              <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-md glass p-6 rounded-xl">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value="********" disabled />
                  <Button variant="link" size="sm" className="px-0 h-auto">
                    Change Password
                  </Button>
                </div>
                
                <Button type="submit">
                  Save Changes
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <h2 className="text-2xl font-bold">Notification Settings</h2>
              
              <div className="glass p-6 rounded-xl max-w-2xl">
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
              
              <div className="glass p-6 rounded-xl max-w-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Language</h3>
                      <p className="text-sm text-muted-foreground">Currently set to English</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Preferred Currency</h3>
                      <p className="text-sm text-muted-foreground">Currently set to INR (₹)</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
