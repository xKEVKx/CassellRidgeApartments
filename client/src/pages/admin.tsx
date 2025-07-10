import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { GalleryImage } from '@shared/schema';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photoUpdates, setPhotoUpdates] = useState<Record<number, { category: string; filename?: string }>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if already authenticated on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    enabled: isAuthenticated,
  });

  const savePhotosMutation = useMutation({
    mutationFn: async (updates: Record<number, { category: string; filename?: string }>) => {
      const updatePromises = Object.entries(updates).map(([id, data]) => 
        apiRequest(`/api/gallery/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ category: data.category }),
        })
      );
      return Promise.all(updatePromises);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo categorizations updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      setPhotoUpdates({});
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update photo categorizations",
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    if (password === 'Everest') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleCategoryChange = (photoId: number, category: string) => {
    setPhotoUpdates(prev => ({
      ...prev,
      [photoId]: {
        ...prev[photoId],
        category
      }
    }));
  };

  const handleFilenameChange = (photoId: number, filename: string) => {
    setPhotoUpdates(prev => ({
      ...prev,
      [photoId]: {
        ...prev[photoId],
        filename,
        category: prev[photoId]?.category || images?.find(img => img.id === photoId)?.category || ''
      }
    }));
  };

  const handleSaveAll = () => {
    if (Object.keys(photoUpdates).length === 0) {
      toast({
        title: "No Changes",
        description: "No changes to save",
      });
      return;
    }
    savePhotosMutation.mutate(photoUpdates);
  };

  const categories = ['interior', 'community', 'pool', 'fitness center'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Photo Management Admin</h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleSaveAll}
              disabled={Object.keys(photoUpdates).length === 0 || savePhotosMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {savePhotosMutation.isPending ? 'Saving...' : `Save Changes (${Object.keys(photoUpdates).length})`}
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('admin_auth');
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading photos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images?.map((image) => {
              const filename = image.imageUrl?.split('/').pop()?.split('.')[0] || '';
              const currentCategory = photoUpdates[image.id]?.category || image.category;
              const currentFilename = photoUpdates[image.id]?.filename || filename;
              const hasChanges = photoUpdates[image.id];

              return (
                <Card key={image.id} className={`overflow-hidden ${hasChanges ? 'ring-2 ring-emerald-500' : ''}`}>
                  <div className="aspect-video bg-gray-100">
                    <img 
                      src={image.imageUrl} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="text-sm text-gray-600">
                      ID: {image.id} | Original: {filename}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`category-${image.id}`}>Category</Label>
                      <Select 
                        value={currentCategory} 
                        onValueChange={(value) => handleCategoryChange(image.id, value)}
                      >
                        <SelectTrigger id={`category-${image.id}`}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`filename-${image.id}`}>Filename (without extension)</Label>
                      <Input
                        id={`filename-${image.id}`}
                        value={currentFilename}
                        onChange={(e) => handleFilenameChange(image.id, e.target.value)}
                        placeholder="Enter filename"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}