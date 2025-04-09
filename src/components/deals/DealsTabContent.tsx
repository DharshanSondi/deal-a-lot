
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { DealsList } from "./DealsList";
import { DealProps } from "@/components/ui/deal-card";

interface DealsTabContentProps {
  tabValue: string;
  deals: DealProps[];
  isLoading: boolean;
}

export function DealsTabContent({ tabValue, deals, isLoading }: DealsTabContentProps) {
  return (
    <TabsContent value={tabValue} className="mt-6">
      <DealsList deals={deals} isLoading={isLoading} />
    </TabsContent>
  );
}
