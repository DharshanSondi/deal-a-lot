
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { DealsList } from "./DealsList";
import { DealProps } from "@/components/ui/deal-card";
import { assets } from "@/assets/assets";

interface DealsTabContentProps {
  tabValue: string;
  deals: DealProps[];
  isLoading: boolean;
}

export function DealsTabContent({ tabValue, deals, isLoading }: DealsTabContentProps) {
  // Get the appropriate icon based on tab value
  const getTabIcon = () => {
    switch(tabValue) {
      case 'trending':
        return assets.parcel_icon;
      case 'new':
        return assets.add_icon;
      case 'offers':
        return assets.order_icon;
      default:
        return null;
    }
  };

  return (
    <TabsContent value={tabValue} className="mt-6">
      {getTabIcon() && (
        <div className="mb-4 flex justify-center">
          <img 
            src={getTabIcon()} 
            alt={`${tabValue} icon`} 
            className="w-6 h-6 opacity-70"
          />
        </div>
      )}
      <DealsList deals={deals} isLoading={isLoading} />
    </TabsContent>
  );
}
