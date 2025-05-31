
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Save, RefreshCw } from "lucide-react";
import { Deal } from "@/types/deals";

interface ManualDealForm {
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  externalUrl: string;
  platform: string;
  category: string;
  rating: number;
}

export function DealCuration() {
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [manualDeals, setManualDeals] = useState<Deal[]>([]);
  const [dealForm, setDealForm] = useState<ManualDealForm>({
    title: '',
    description: '',
    originalPrice: 0,
    discountedPrice: 0,
    imageUrl: '',
    externalUrl: '',
    platform: 'other',
    category: 'electronics',
    rating: 4.0
  });

  const handleAddDeal = () => {
    if (!dealForm.title || !dealForm.externalUrl || dealForm.discountedPrice <= 0) {
      toast({
        title: "Invalid Deal",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const discountPercentage = Math.round(
      ((dealForm.originalPrice - dealForm.discountedPrice) / dealForm.originalPrice) * 100
    );

    const newDeal: Deal = {
      id: `manual-${Date.now()}`,
      ...dealForm,
      discountPercentage,
      isNew: true,
      isTrending: false,
      ratingCount: Math.floor(Math.random() * 500) + 50
    };

    setManualDeals(prev => [...prev, newDeal]);
    
    // Save to localStorage for persistence
    const savedDeals = JSON.parse(localStorage.getItem('manualDeals') || '[]');
    localStorage.setItem('manualDeals', JSON.stringify([...savedDeals, newDeal]));

    toast({
      title: "Deal Added",
      description: "Manual deal has been added successfully"
    });

    // Reset form
    setDealForm({
      title: '',
      description: '',
      originalPrice: 0,
      discountedPrice: 0,
      imageUrl: '',
      externalUrl: '',
      platform: 'other',
      category: 'electronics',
      rating: 4.0
    });
    setIsAddingDeal(false);
  };

  const loadSavedDeals = () => {
    const saved = JSON.parse(localStorage.getItem('manualDeals') || '[]');
    setManualDeals(saved);
    toast({
      title: "Deals Loaded",
      description: `Loaded ${saved.length} manually curated deals`
    });
  };

  React.useEffect(() => {
    loadSavedDeals();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Deal Curation</h2>
          <p className="text-muted-foreground">Manually add and manage deals</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSavedDeals} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setIsAddingDeal(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {isAddingDeal && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Deal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={dealForm.title}
                  onChange={(e) => setDealForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Deal title"
                />
              </div>
              <div>
                <Label htmlFor="platform">Platform</Label>
                <select
                  id="platform"
                  value={dealForm.platform}
                  onChange={(e) => setDealForm(prev => ({ ...prev, platform: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="amazon">Amazon</option>
                  <option value="meesho">Meesho</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="originalPrice">Original Price *</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={dealForm.originalPrice}
                  onChange={(e) => setDealForm(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="discountedPrice">Discounted Price *</Label>
                <Input
                  id="discountedPrice"
                  type="number"
                  value={dealForm.discountedPrice}
                  onChange={(e) => setDealForm(prev => ({ ...prev, discountedPrice: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={dealForm.imageUrl}
                  onChange={(e) => setDealForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="externalUrl">Product URL *</Label>
                <Input
                  id="externalUrl"
                  value={dealForm.externalUrl}
                  onChange={(e) => setDealForm(prev => ({ ...prev, externalUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={dealForm.description}
                onChange={(e) => setDealForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deal description"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddDeal}>
                <Save className="h-4 w-4 mr-2" />
                Save Deal
              </Button>
              <Button variant="outline" onClick={() => setIsAddingDeal(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {manualDeals.map((deal) => (
          <Card key={deal.id}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium line-clamp-2">{deal.title}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">₹{deal.discountedPrice}</span>
                    <span className="text-sm line-through text-muted-foreground ml-2">
                      ₹{deal.originalPrice}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    {deal.discountPercentage}% off
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{deal.platform}</span>
                  <span>{deal.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {manualDeals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No manually curated deals yet.</p>
          <p>Click "Add Deal" to start curating deals manually.</p>
        </div>
      )}
    </div>
  );
}
