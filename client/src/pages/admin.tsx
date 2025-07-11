import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { GalleryImage, FloorPlan, HomePageAd } from '@shared/schema';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Upload, Plus } from 'lucide-react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photoUpdates, setPhotoUpdates] = useState<Record<number, { category: string; filename?: string }>>({});
  const [rentUpdates, setRentUpdates] = useState<Record<number, number>>({});
  const [promotionUpdates, setPromotionUpdates] = useState<Record<number, boolean>>({});
  const [reorderMode, setReorderMode] = useState(false);
  const [reorderedImages, setReorderedImages] = useState<GalleryImage[]>([]);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [adImageFile, setAdImageFile] = useState<File | null>(null);
  const [adImagePreview, setAdImagePreview] = useState<string>('');
  const [showAdForm, setShowAdForm] = useState(false);
  const [editingAd, setEditingAd] = useState<HomePageAd | null>(null);
  const [adFormData, setAdFormData] = useState({
    displayFrequency: 5,
    isActive: true,
    startDate: '',
    endDate: ''
  });
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

  const { data: homePageAds, isLoading: homePageAdsLoading } = useQuery<HomePageAd[]>({
    queryKey: ['/api/home-page-ads'],
    enabled: isAuthenticated,
  });

  const savePhotosMutation = useMutation({
    mutationFn: async (updates: Record<number, { category: string; filename?: string }>) => {
      // Filter out updates for images that don't exist anymore
      const currentImageIds = new Set(images?.map(img => img.id) || []);
      const validUpdates = Object.entries(updates).filter(([id]) => 
        currentImageIds.has(parseInt(id))
      );
      
      if (validUpdates.length === 0) {
        return Promise.resolve([]); // No valid updates to process
      }
      
      const updatePromises = validUpdates.map(([id, data]) => 
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

  const savePromotionsMutation = useMutation({
    mutationFn: async (updates: Record<number, boolean>) => {
      console.log('Attempting to save promotion updates:', updates);
      const updatePromises = Object.entries(updates).map(([id, promotionAvailable]) => {
        console.log(`Updating floor plan ${id} with promotion ${promotionAvailable}`);
        return apiRequest('PATCH', `/api/floor-plans/${id}`, { promotionAvailable });
      });
      return Promise.all(updatePromises);
    },
    onSuccess: (data) => {
      console.log('Promotion update successful:', data);
      toast({
        title: "Success",
        description: "Promotional banners updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/floor-plans'] });
      setPromotionUpdates({});
    },
    onError: (error) => {
      console.error('Promotion update failed:', error);
      toast({
        title: "Error",
        description: "Failed to update promotional banners",
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

  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: number) => {
      return apiRequest('DELETE', `/api/gallery/${imageId}`);
    },
    onSuccess: (_, deletedId) => {
      toast({
        title: "Success",
        description: "Photo deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      
      // Clean up any pending updates for the deleted image
      setPhotoUpdates(prev => {
        const updated = { ...prev };
        delete updated[deletedId];
        return updated;
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      });
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const uploadPromises = files.map(async (file) => {
        // Compress and create a data URL for the image preview
        const compressedDataUrl = await new Promise<string>((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            // Calculate new dimensions (max 1200px width/height)
            const maxSize = 1200;
            let { width, height } = img;
            
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress the image
            ctx?.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
            resolve(compressedDataUrl);
          };
          
          const reader = new FileReader();
          reader.onload = () => {
            img.src = reader.result as string;
          };
          reader.readAsDataURL(file);
        });
        
        const title = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const maxSortOrder = Math.max(...(images?.map(img => img.sortOrder || 0) || [0]));
        
        return apiRequest('POST', '/api/gallery', {
          title,
          description: '',
          imageUrl: compressedDataUrl, // Use compressed data URL
          category: 'uncategorized',
          featured: false,
          sortOrder: maxSortOrder + 1 // Add to end of list
        });
      });
      return Promise.all(uploadPromises);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photos uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      setUploadFiles([]);
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload photos",
        variant: "destructive",
      });
    },
  });

  const createHomePageAdMutation = useMutation({
    mutationFn: async (adData: { imageUrl: string; displayFrequency: number; isActive: boolean; startDate?: string; endDate?: string }) => {
      return apiRequest('POST', '/api/home-page-ads', adData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Home page ad created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/home-page-ads'] });
      setShowAdForm(false);
      setAdImageFile(null);
      setAdImagePreview('');
      setAdFormData({
        displayFrequency: 5,
        isActive: true,
        startDate: '',
        endDate: ''
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create home page ad",
        variant: "destructive",
      });
    },
  });

  const updateHomePageAdMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<HomePageAd> }) => {
      return apiRequest('PATCH', `/api/home-page-ads/${id}`, updates);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Home page ad updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/home-page-ads'] });
      if (editingAd && showAdForm) {
        handleCancelAdForm();
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update home page ad",
        variant: "destructive",
      });
    },
  });

  const deleteHomePageAdMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/home-page-ads/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Home page ad deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/home-page-ads'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete home page ad",
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setIsAuthenticated(false);
      sessionStorage.removeItem('admin_auth');
      setPassword('');
      
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Logout failed",
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
    const hasRentChanges = Object.keys(rentUpdates).length > 0;
    const hasPromotionChanges = Object.keys(promotionUpdates).length > 0;
    
    if (!hasRentChanges && !hasPromotionChanges) {
      toast({
        title: "No Changes",
        description: "No rent or promotion changes to save",
      });
      return;
    }
    
    const promises = [];
    if (hasRentChanges) {
      promises.push(saveRentsMutation.mutateAsync(rentUpdates));
    }
    if (hasPromotionChanges) {
      promises.push(savePromotionsMutation.mutateAsync(promotionUpdates));
    }
    
    Promise.all(promises).then(() => {
      // Clear both state objects on success
      setRentUpdates({});
      setPromotionUpdates({});
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/floor-plans'] });
      toast({
        title: "Success",
        description: "All changes saved successfully",
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Some changes failed to save",
        variant: "destructive",
      });
    });
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

  const handlePromotionChange = (floorPlanId: number, promotionAvailable: boolean) => {
    console.log(`Setting promotion update for floor plan ${floorPlanId}: ${promotionAvailable}`);
    setPromotionUpdates(prev => ({
      ...prev,
      [floorPlanId]: promotionAvailable
    }));
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

  const handleDeleteImage = (imageId: number) => {
    deleteImageMutation.mutate(imageId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImageFiles = files.filter(file => {
      const fileType = file.type.toLowerCase();
      return fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png';
    });
    
    if (files.length > validImageFiles.length) {
      toast({
        title: "Invalid Files",
        description: "Only .jpg, .jpeg, and .png files are allowed. Some files were filtered out.",
        variant: "destructive",
      });
    }
    
    setUploadFiles(validImageFiles);
  };

  const handleUploadImages = () => {
    if (uploadFiles.length === 0) {
      toast({
        title: "No Files",
        description: "Please select images to upload",
      });
      return;
    }
    uploadImagesMutation.mutate(uploadFiles);
  };

  const handleAdImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const fileType = file.type.toLowerCase();
    if (fileType !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/png') {
      toast({
        title: "Invalid File",
        description: "Only .jpg, .jpeg, and .png files are allowed.",
        variant: "destructive",
      });
      return;
    }
    
    setAdImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setAdImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateAd = async () => {
    if (!adImagePreview) {
      toast({
        title: "Missing Image",
        description: "Please select an image for the ad",
        variant: "destructive",
      });
      return;
    }
    
    // Use existing image if editing and no new image uploaded
    let imageUrl = adImagePreview;
    
    // If new image uploaded, compress it
    if (adImageFile) {
      imageUrl = await new Promise<string>((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          const maxSize = 1200;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedDataUrl);
        };
        
        img.src = adImagePreview;
      });
    }
    
    const adData = {
      imageUrl,
      displayFrequency: adFormData.displayFrequency,
      isActive: adFormData.isActive,
      startDate: adFormData.startDate || undefined,
      endDate: adFormData.endDate || undefined,
    };
    
    if (editingAd) {
      updateHomePageAdMutation.mutate({
        id: editingAd.id,
        updates: adData
      });
    } else {
      createHomePageAdMutation.mutate(adData);
    }
  };

  const handleEditAd = (ad: HomePageAd) => {
    setEditingAd(ad);
    setAdFormData({
      displayFrequency: ad.displayFrequency,
      isActive: ad.isActive,
      startDate: ad.startDate ? new Date(ad.startDate).toISOString().split('T')[0] : '',
      endDate: ad.endDate ? new Date(ad.endDate).toISOString().split('T')[0] : '',
    });
    setAdImagePreview(ad.imageUrl);
    setShowAdForm(true);
  };

  const handleCancelAdForm = () => {
    setShowAdForm(false);
    setEditingAd(null);
    setAdImageFile(null);
    setAdImagePreview('');
    setAdFormData({
      displayFrequency: 5,
      isActive: true,
      startDate: '',
      endDate: ''
    });
  };

  const categories = ['interior', 'community', 'pool', 'fitness center', 'uncategorized'];

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
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="rents" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rents">Rents</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="homepage-ad">Home Page Ad</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
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
              
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={handleFileUpload}
                  className="max-w-xs"
                />
                <Button 
                  onClick={handleUploadImages}
                  disabled={uploadFiles.length === 0 || uploadImagesMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {uploadImagesMutation.isPending ? 'Uploading...' : `Upload ${uploadFiles.length} Photo${uploadFiles.length !== 1 ? 's' : ''}`}
                </Button>
              </div>
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
                        
                        <div className="flex justify-end pt-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the photo from the gallery.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteImage(image.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
                disabled={Object.keys(rentUpdates).length === 0 && Object.keys(promotionUpdates).length === 0 || saveRentsMutation.isPending || savePromotionsMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {(saveRentsMutation.isPending || savePromotionsMutation.isPending) ? 'Saving...' : `Save Changes (${Object.keys(rentUpdates).length + Object.keys(promotionUpdates).length})`}
              </Button>
            </div>

            {floorPlansLoading ? (
              <div className="text-center py-8">Loading floor plans...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {floorPlans?.map((plan) => {
                  const currentRent = rentUpdates[plan.id] || plan.startingPrice;
                  const currentPromotion = promotionUpdates[plan.id] !== undefined ? promotionUpdates[plan.id] : plan.promotionAvailable;
                  const hasRentChanges = rentUpdates[plan.id] !== undefined;
                  const hasPromotionChanges = promotionUpdates[plan.id] !== undefined;
                  const hasChanges = hasRentChanges || hasPromotionChanges;
                  
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

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`promotion-${plan.id}`}
                              checked={currentPromotion}
                              onCheckedChange={(checked) => handlePromotionChange(plan.id, !!checked)}
                            />
                            <Label htmlFor={`promotion-${plan.id}`} className="text-sm font-medium">
                              Promotion Available
                            </Label>
                          </div>
                          <p className="text-xs text-gray-500">Show promotional banner on this floor plan</p>
                        </div>

                        <div className="text-sm text-gray-500">
                          Original: ${plan.startingPrice}
                        </div>
                        
                        <div className="text-xs text-gray-400 border-t pt-2 space-y-1">
                          <div>Rent Last Updated: {formatPacificTime(plan.lastUpdated)}</div>
                          <div>Promo Last Updated: {formatPacificTime(plan.promoLastUpdated)}</div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="homepage-ad" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Home Page Advertisement</h2>
              <Button
                onClick={() => {
                  if (showAdForm) {
                    handleCancelAdForm();
                  } else {
                    setShowAdForm(true);
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {showAdForm ? 'Cancel' : 'Create New Ad'}
              </Button>
            </div>

            {showAdForm && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingAd ? 'Edit Advertisement' : 'Create New Home Page Ad'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad-image">Advertisement Image</Label>
                    <Input
                      id="ad-image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleAdImageUpload}
                    />
                    {adImagePreview && (
                      <div className="mt-4">
                        <img
                          src={adImagePreview}
                          alt="Ad preview"
                          className="max-w-md h-auto rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-frequency">Display Frequency (every X visits)</Label>
                      <Input
                        id="display-frequency"
                        type="number"
                        min="1"
                        max="100"
                        value={adFormData.displayFrequency}
                        onChange={(e) => setAdFormData(prev => ({
                          ...prev,
                          displayFrequency: parseInt(e.target.value) || 5
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="is-active"
                          checked={adFormData.isActive}
                          onCheckedChange={(checked) => setAdFormData(prev => ({
                            ...prev,
                            isActive: !!checked
                          }))}
                        />
                        <Label htmlFor="is-active">Active</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date (optional)</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={adFormData.startDate}
                        onChange={(e) => setAdFormData(prev => ({
                          ...prev,
                          startDate: e.target.value
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date (optional)</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={adFormData.endDate}
                        onChange={(e) => setAdFormData(prev => ({
                          ...prev,
                          endDate: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleCancelAdForm}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateAd}
                      disabled={(!adImageFile && !editingAd) || createHomePageAdMutation.isPending || updateHomePageAdMutation.isPending}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {(createHomePageAdMutation.isPending || updateHomePageAdMutation.isPending) 
                        ? (editingAd ? 'Updating...' : 'Creating...') 
                        : (editingAd ? 'Update Ad' : 'Create Ad')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {homePageAdsLoading ? (
              <div className="text-center py-8">Loading home page ads...</div>
            ) : (
              <div className="space-y-4">
                {homePageAds?.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-gray-500">No home page ads created yet.</p>
                      <p className="text-sm text-gray-400 mt-2">Create your first ad to get started.</p>
                    </CardContent>
                  </Card>
                ) : (
                  homePageAds?.map((ad) => (
                    <Card key={ad.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={ad.imageUrl}
                              alt="Home page ad"
                              className="w-32 h-20 object-cover rounded-lg border"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">Ad #{ad.id}</h3>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  ad.isActive 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {ad.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAd(ad)}
                                  className="mr-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    updateHomePageAdMutation.mutate({
                                      id: ad.id,
                                      updates: { isActive: !ad.isActive }
                                    });
                                  }}
                                  disabled={updateHomePageAdMutation.isPending}
                                  className="mr-2"
                                >
                                  {updateHomePageAdMutation.isPending ? 'Updating...' : (ad.isActive ? 'Deactivate' : 'Activate')}
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Advertisement</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this home page advertisement? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteHomePageAdMutation.mutate(ad.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>Display Frequency: Every {ad.displayFrequency} visits</p>
                              {ad.startDate && <p>Start Date: {new Date(ad.startDate).toLocaleDateString()}</p>}
                              {ad.endDate && <p>End Date: {new Date(ad.endDate).toLocaleDateString()}</p>}
                              <p className="text-xs text-gray-400 mt-1">
                                Created: {new Date(ad.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}