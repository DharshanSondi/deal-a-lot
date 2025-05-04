
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Settings, Bell, LogOut, Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import UserFeedback from "@/components/feedback/UserFeedback";
import AvatarSelector from "@/components/profile/AvatarSelector";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // User details state
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "I'm always looking for the best deals on tech and fashion!",
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    priceDrops: true,
    newDeals: true,
    newsletter: false,
  });
  
  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    darkMode: true,
    language: "english",
    currency: "usd",
  });
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Profile updated successfully!", {
        className: "bg-background border-green-500",
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const handleAvatarChange = (newAvatarUrl: string) => {
    setUserData({...userData, avatar: newAvatarUrl});
  };
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info("You've been signed out", {
        className: "bg-background border-blue-500",
      });
      navigate("/");
    } catch (error) {
      toast.error("Error signing out", {
        className: "bg-background border-red-500",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account settings and preferences
          </p>
          
          <div className="bg-card rounded-xl shadow-sm p-6">
            <Tabs 
              defaultValue="account" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger value="feedback" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Feedback</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <AvatarSelector
                      currentAvatar={userData.avatar}
                      userName={userData.name}
                      onAvatarChange={handleAvatarChange}
                    />
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={userData.bio}
                        onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="destructive" onClick={handleSignOut} type="button">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                  
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Alerts</h3>
                      <p className="text-sm text-muted-foreground">Receive emails about your activity</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, emailAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Price Drop Alerts</h3>
                      <p className="text-sm text-muted-foreground">Get notified when items in your wishlist drop in price</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.priceDrops}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, priceDrops: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Deal Notifications</h3>
                      <p className="text-sm text-muted-foreground">Be the first to know about new deals</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.newDeals}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, newDeals: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Newsletter</h3>
                      <p className="text-sm text-muted-foreground">Receive a weekly summary of top deals</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.newsletter}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, newsletter: checked})
                      }
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select 
                      id="language" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={accountSettings.language}
                      onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <select 
                      id="currency" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={accountSettings.currency}
                      onChange={(e) => setAccountSettings({...accountSettings, currency: e.target.value})}
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="inr">INR (₹)</option>
                      <option value="jpy">JPY (¥)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-muted-foreground">Toggle dark mode</p>
                    </div>
                    <Switch 
                      checked={accountSettings.darkMode}
                      onCheckedChange={(checked) => 
                        setAccountSettings({...accountSettings, darkMode: checked})
                      }
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <UserFeedback />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
