import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomePageAd } from '@shared/schema';

interface HomePageAdSliderProps {
  isVisible: boolean;
  onClose: () => void;
  initialMinimized?: boolean;
}

export default function HomePageAdSlider({ isVisible, onClose, initialMinimized = false }: HomePageAdSliderProps) {
  const [isExpanded, setIsExpanded] = useState(!initialMinimized);

  const { data: activeAd } = useQuery<HomePageAd | null>({
    queryKey: ['/api/home-page-ads/active'],
    enabled: isVisible,
  });

  // Reset expanded state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setIsExpanded(false);
    } else {
      setIsExpanded(!initialMinimized);
    }
  }, [isVisible, initialMinimized]);

  if (!isVisible || !activeAd) {
    return null;
  }

  // Check if ad should be displayed based on date range
  const now = new Date();
  const startDate = activeAd.startDate ? new Date(activeAd.startDate) : null;
  const endDate = activeAd.endDate ? new Date(activeAd.endDate) : null;

  if (startDate && now < startDate) return null;
  if (endDate && now > endDate) return null;
  if (!activeAd.isActive) return null;

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Slider */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out ${
          isExpanded 
            ? 'w-96 max-w-[90vw]' 
            : 'w-16'
        }`}
        style={{
          transform: `translateX(${isExpanded ? '0' : '-calc(100% - 4rem)'}) translateY(-50%)`
        }}
      >
        <div className="bg-white rounded-r-xl shadow-2xl overflow-hidden border-r border-t border-b border-gray-200">
          {/* Collapsed State - Tab Handle */}
          {!isExpanded && (
            <div 
              className="h-32 w-16 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center cursor-pointer hover:from-emerald-600 hover:to-teal-700 transition-colors duration-200"
              onClick={() => setIsExpanded(true)}
            >
              <div className="text-white transform -rotate-90 whitespace-nowrap text-sm font-medium">
                Special Offer
              </div>
              <ChevronRight className="h-4 w-4 text-white absolute right-1" />
            </div>
          )}

          {/* Expanded State - Full Ad */}
          {isExpanded && (
            <div className="p-4">
              {/* Close Button */}
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Ad Content */}
              <div className="space-y-4">
                <img
                  src={activeAd.imageUrl}
                  alt="Special offer"
                  className="w-full h-auto rounded-lg border"
                />
                

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}