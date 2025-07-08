import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import type { FloorPlan } from "@shared/schema";

export default function FloorPlans() {
  const { data: floorPlans, isLoading } = useQuery<FloorPlan[]>({
    queryKey: ["/api/floor-plans"],
  });

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Floor Plans</h1>
          <p className="text-xl text-gray-600">
            Choose from our spacious 1, 2, and 3 bedroom apartment homes designed for comfort and modern living
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-20 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            floorPlans?.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={plan.imageUrl} 
                    alt={`${plan.name} floor plan`}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                      <div className="text-lg font-semibold">{plan.bedrooms}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                      <div className="text-lg font-semibold">{plan.bathrooms}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Square Feet</div>
                      <div className="text-lg font-semibold">{plan.sqft.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Starting at</div>
                      <Badge variant="secondary" className="text-green-700 font-semibold">
                        ${plan.startingPrice.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  
                  <ScheduleVisitModal
                    floorPlan={plan.name}
                    trigger={
                      <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md font-medium transition-colors">
                        Schedule Visit
                      </button>
                    }
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {!isLoading && (!floorPlans || floorPlans.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600">No floor plans available at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
