
import React from 'react';
import { Navbar } from "@/components/ui/navbar";
import { DealCuration } from "@/components/admin/DealCuration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Settings, BarChart3 } from "lucide-react";
import { useEnhancedDeals } from "@/hooks/useEnhancedDeals";

export default function Admin() {
  const { deals, isLoading, lastUpdated, forceRefresh } = useEnhancedDeals({
    enableRealTime: false
  });

  const stats = {
    totalDeals: deals.length,
    activeSources: 4,
    avgDiscount: deals.length > 0 ? Math.round(deals.reduce((acc, deal) => acc + deal.discountPercentage, 0) / deals.length) : 0,
    newDealsToday: deals.filter(deal => deal.isNew).length
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage deals, sources, and monitor performance</p>
              </div>
              <Button onClick={forceRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh All Data
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDeals}</div>
                  <Badge variant="outline" className="mt-1">
                    <Database className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeSources}</div>
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-600">
                    <Settings className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Discount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgDiscount}%</div>
                  <Badge variant="outline" className="mt-1">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">New Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newDealsToday}</div>
                  <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-600">
                    Fresh
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {lastUpdated && (
              <p className="text-sm text-muted-foreground mb-6">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>

          <Tabs defaultValue="curation" className="space-y-6">
            <TabsList className="glass backdrop-blur-sm">
              <TabsTrigger value="curation">Deal Curation</TabsTrigger>
              <TabsTrigger value="sources">API Sources</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="curation">
              <DealCuration />
            </TabsContent>

            <TabsContent value="sources">
              <Card>
                <CardHeader>
                  <CardTitle>API Sources Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: "Amazon Associates", status: "Mock Active", type: "affiliate" },
                        { name: "RapidAPI E-commerce", status: "Mock Active", type: "api" },
                        { name: "Commission Junction", status: "Mock Active", type: "affiliate" },
                        { name: "Manual Curation", status: "Active", type: "manual" }
                      ].map((source) => (
                        <Card key={source.name}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{source.name}</h3>
                              <Badge variant={source.status === "Active" ? "default" : "secondary"}>
                                {source.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">{source.type}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Ready for Real API Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        The system is prepared to integrate with real APIs. Configure your API keys and endpoints to replace mock data with live deals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Deal Distribution by Platform</h4>
                      <div className="space-y-2">
                        {['amazon', 'meesho', 'other'].map(platform => {
                          const count = deals.filter(deal => deal.platform === platform).length;
                          const percentage = deals.length > 0 ? (count / deals.length) * 100 : 0;
                          return (
                            <div key={platform} className="flex items-center justify-between">
                              <span className="capitalize">{platform}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm w-12">{count}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Category Performance</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['electronics', 'fashion', 'home', 'beauty', 'toys'].map(category => {
                          const categoryDeals = deals.filter(deal => deal.category === category);
                          const avgDiscount = categoryDeals.length > 0 
                            ? Math.round(categoryDeals.reduce((acc, deal) => acc + deal.discountPercentage, 0) / categoryDeals.length)
                            : 0;
                          
                          return (
                            <Card key={category}>
                              <CardContent className="p-4 text-center">
                                <h5 className="font-medium capitalize">{category}</h5>
                                <p className="text-2xl font-bold text-primary">{avgDiscount}%</p>
                                <p className="text-sm text-muted-foreground">{categoryDeals.length} deals</p>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">API Configuration</h4>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Amazon Associates API</h5>
                          <p className="text-sm text-muted-foreground mb-2">Configure your Amazon Associates credentials</p>
                          <Button variant="outline" size="sm">Configure API Keys</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">RapidAPI Integration</h5>
                          <p className="text-sm text-muted-foreground mb-2">Connect to RapidAPI e-commerce endpoints</p>
                          <Button variant="outline" size="sm">Setup RapidAPI</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Commission Junction</h5>
                          <p className="text-sm text-muted-foreground mb-2">Configure affiliate network integration</p>
                          <Button variant="outline" size="sm">Setup CJ API</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Refresh Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between">
                          <span>Auto-refresh interval</span>
                          <select className="border rounded px-3 py-1">
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                          </select>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>Enable real-time updates</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
