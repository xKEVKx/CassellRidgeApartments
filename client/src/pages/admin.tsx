import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { GalleryImage, FloorPlan } from '@shared/schema';
import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photoUpdates, setPhotoUpdates] = useState<Record<number, { category: string; filename?: string }>>({});
  const [rentUpdates, setRentUpdates] = useState<Record<number, number>>({});
  const [reorderMode, setReorderMode] = useState(false);
  const [reorderedImages, setReorderedImages] = useState<GalleryImage[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if already authenticated on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const { data: images, isLoading: imagesLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    enabled: isAuthenticated,
  });

  const { data: floorPlans, isLoading: floorPlansLoading } = useQuery<FloorPlan[]>({
    queryKey: ['/api/floor-plans'],
    enabled: isAuthenticated,
  });

  const savePhotosMutation = useMutation({
    mutationFn: async (updates: Record<number, { category: string; filename?: string }>) => {
      const updatePromises = Object.entries(updates).map(([id, data]) => 
        apiRequest('PATCH', `/api/gallery/${id}`, { category: data.category })
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

  const saveRentsMutation = useMutation({
    mutationFn: async (updates: Record<number, number>) => {
      console.log('Attempting to save rent updates:', updates);
      const updatePromises = Object.entries(updates).map(([id, startingPrice]) => {
        console.log(`Updating floor plan ${id} with price ${startingPrice}`);
        return apiRequest('PATCH', `/api/floor-plans/${id}`, { startingPrice });
      });
      return Promise.all(updatePromises);
    },
    onSuccess: (data) => {
      console.log('Rent update successful:', data);
      toast({
        title: "Success",
        description: "Rent prices updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/floor-plans'] });
      setRentUpdates({});
    },
    onError: (error) => {
      console.error('Rent update failed:', error);
      toast({
        title: "Error",
        description: "Failed to update rent prices",
        variant: "destructive",
      });
    },
  });

  const reorderImagesMutation = useMutation({
    mutationFn: async (imageOrders: { id: number; sortOrder: number }[]) => {
      return apiRequest('PATCH', '/api/gallery/reorder', { imageOrders });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo order updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      setReorderMode(false);
      setReorderedImages([]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update photo order",
        variant: "destructive",
      });
    },
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate",
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

  const handleSavePhotos = () => {
    if (Object.keys(photoUpdates).length === 0) {
      toast({
        title: "No Changes",
        description: "No photo changes to save",
      });
      return;
    }
    savePhotosMutation.mutate(photoUpdates);
  };

  const handleSaveRents = () => {
    if (Object.keys(rentUpdates).length === 0) {
      toast({
        title: "No Changes",
        description: "No rent changes to save",
      });
      return;
    }
    saveRentsMutation.mutate(rentUpdates);
  };

  const handleRentChange = (floorPlanId: number, rent: string) => {
    // Only allow empty string or numeric values
    if (rent === '' || /^\d+$/.test(rent)) {
      const rentValue = rent === '' ? 0 : parseInt(rent);
      
      if (rent === '' || (rentValue > 0 && rentValue <= 999999)) {
        console.log(`Setting rent update for floor plan ${floorPlanId}: ${rentValue}`);
        setRentUpdates(prev => ({
          ...prev,
          [floorPlanId]: rentValue
        }));
      }
    }
    // If input is not numeric, don't update the state (input will be rejected)
  };

  const handleStartReorder = () => {
    setReorderMode(true);
    setReorderedImages([...(images || [])]);
  };

  const handleCancelReorder = () => {
    setReorderMode(false);
    setReorderedImages([]);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newImages = [...reorderedImages];
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
      setReorderedImages(newImages);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < reorderedImages.length - 1) {
      const newImages = [...reorderedImages];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      setReorderedImages(newImages);
    }
  };

  const handleSaveOrder = () => {
    const imageOrders = reorderedImages.map((image, index) => ({
      id: image.id,
      sortOrder: index + 1
    }));
    reorderImagesMutation.mutate(imageOrders);
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
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

        <Tabs defaultValue="rents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rents">Rents</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleSavePhotos}
                disabled={Object.keys(photoUpdates).length === 0 || savePhotosMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {savePhotosMutation.isPending ? 'Saving...' : `Save Photo Changes (${Object.keys(photoUpdates).length})`}
              </Button>
              
              {!reorderMode ? (
                <Button 
                  onClick={handleStartReorder}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <GripVertical className="h-4 w-4" />
                  Reorder Photos
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={handleSaveOrder}
                    disabled={reorderImagesMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {reorderImagesMutation.isPending ? 'Saving...' : 'Save Order'}
                  </Button>
                  <Button 
                    onClick={handleCancelReorder}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {imagesLoading ? (
              <div className="text-center py-8">Loading photos...</div>
            ) : reorderMode ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Use the arrows to reorder photos. The first photo will appear first in the gallery.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reorderedImages.map((image, index) => (
                    <Card key={image.id} className="overflow-hidden">
                      <div className="aspect-video bg-gray-100">
                        <img 
                          src={image.imageUrl} 
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            #{index + 1} - {image.category}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMoveDown(index)}
                              disabled={index === reorderedImages.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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
          </TabsContent>

          <TabsContent value="rents" className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleSaveRents}
                disabled={Object.keys(rentUpdates).length === 0 || saveRentsMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saveRentsMutation.isPending ? 'Saving...' : `Save Rent Changes (${Object.keys(rentUpdates).length})`}
              </Button>
            </div>

            {floorPlansLoading ? (
              <div className="text-center py-8">Loading floor plans...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {floorPlans?.map((plan) => {
                  const currentRent = rentUpdates[plan.id] || plan.startingPrice;
                  const hasChanges = rentUpdates[plan.id];
                  
                  // Format the last updated date in Pacific time
                  const formatPacificTime = (dateString: string | null) => {
                    if (!dateString) return 'Not set';
                    
                    const date = new Date(dateString);
                    return date.toLocaleString('en-US', {
                      timeZone: 'America/Los_Angeles',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    });
                  };

                  return (
                    <Card key={plan.id} className={`${hasChanges ? 'ring-2 ring-emerald-500' : ''}`}>
                      <CardHeader>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-sm text-gray-600">
                          {plan.bedrooms} bed, {plan.bathrooms} bath | {plan.sqft} sq ft
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`rent-${plan.id}`}>Rent:</Label>
                          <Input
                            id={`rent-${plan.id}`}
                            type="text"
                            value={currentRent}
                            onChange={(e) => handleRentChange(plan.id, e.target.value)}
                            placeholder="Enter rent amount"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>

                        <div className="text-sm text-gray-500">
                          Original: ${plan.startingPrice}
                        </div>
                        
                        <div className="text-xs text-gray-400 border-t pt-2">
                          Last updated: {formatPacificTime(plan.lastUpdated)}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}