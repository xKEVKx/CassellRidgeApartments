import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import FloorPlans from "@/pages/floor-plans";
import Amenities from "@/pages/amenities";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Location from "@/pages/location";
import VirtualTours from "@/pages/virtual-tours";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/floor-plans" component={FloorPlans} />
      <Route path="/amenities" component={Amenities} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/location" component={Location} />
      <Route path="/virtual-tours" component={VirtualTours} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
