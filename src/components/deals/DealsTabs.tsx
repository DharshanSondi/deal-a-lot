
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealsTabContent } from "@/components/deals/DealsTabContent";
import { Deal } from "@/types/deals";

interface DealsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  deals: Deal[];
  isLoading: boolean;
}

export function DealsTabs({ activeTab, setActiveTab, deals, isLoading }: DealsTabsProps) {
  return (
    <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="glass backdrop-blur-sm">
        <TabsTrigger value="all">All Deals</TabsTrigger>
        <TabsTrigger value="trending">Trending</TabsTrigger>
        <TabsTrigger value="new">New Arrivals</TabsTrigger>
        <TabsTrigger value="offers">Best Offers</TabsTrigger>
      </TabsList>
      
      <DealsTabContent tabValue="all" deals={deals} isLoading={isLoading} />
      <DealsTabContent tabValue="trending" deals={deals} isLoading={isLoading} />
      <DealsTabContent tabValue="new" deals={deals} isLoading={isLoading} />
      <DealsTabContent tabValue="offers" deals={deals} isLoading={isLoading} />
    </Tabs>
  );
}
