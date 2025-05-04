
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Sample avatar options (these would be replaced with real avatar URLs)
const AVATAR_OPTIONS = [
  { id: 1, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { id: 2, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: 3, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper' },
  { id: 4, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe' },
  { id: 5, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max' },
  { id: 6, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley' },
  { id: 7, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harper' },
  { id: 8, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn' },
  { id: 9, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avery' },
];

interface AvatarSelectorProps {
  currentAvatar: string;
  userName: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ currentAvatar, userName, onAvatarChange }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload an image file (JPEG, PNG, GIF, WEBP)', {
        className: 'bg-background border-red-500'
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error('Image size should be less than 2MB', {
        className: 'bg-background border-red-500'
      });
      return;
    }

    // Create a local URL for the file
    const localUrl = URL.createObjectURL(file);
    setUploadedAvatar(localUrl);
    setSelectedAvatar(localUrl);
  };

  const handleSaveAvatar = () => {
    if (selectedAvatar) {
      onAvatarChange(selectedAvatar);
      toast.success('Avatar updated successfully', {
        className: 'bg-background border-green-500'
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-2 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={currentAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mb-2">
            Change Avatar
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a new avatar</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={selectedAvatar || currentAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Upload your own image</h4>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('avatar-upload')?.click()}>
                Choose File
              </Button>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/png, image/jpeg, image/gif, image/webp" 
                className="hidden" 
                onChange={handleFileUpload}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Supports JPEG, PNG, GIF, WebP. Max 2MB.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Or choose from our collection</h4>
            <div className="grid grid-cols-3 gap-2">
              {AVATAR_OPTIONS.map((avatar) => (
                <Avatar 
                  key={avatar.id} 
                  className={`cursor-pointer transition-all ${selectedAvatar === avatar.url ? 'ring-2 ring-primary' : 'hover:opacity-80'}`}
                  onClick={() => handleAvatarSelect(avatar.url)}
                >
                  <AvatarImage src={avatar.url} alt="Avatar option" />
                </Avatar>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAvatar} disabled={!selectedAvatar}>
              Save Avatar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSelector;
