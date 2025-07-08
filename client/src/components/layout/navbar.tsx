import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SITE_CONFIG, NAVIGATION_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl">G</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                    The Grove
                  </h1>
                  <div className="text-sm text-slate-500 font-medium">at Deerwood</div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    location === link.href
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:shadow-lg'
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${
                      location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </span>
                </Link>
              ))}
              
              <div className="ml-6 pl-6 border-l border-slate-200">
                <Button 
                  className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105" 
                  asChild
                >
                  <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                    <Phone className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="group bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl text-slate-700 hover:text-emerald-600 transition-all duration-300"
                >
                  <Menu className="h-6 w-6 transition-transform group-hover:scale-110" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Logo in mobile */}
                  <div className="text-center pb-4 border-b border-slate-200">
                    <div className="text-2xl font-bold text-slate-900">The Grove</div>
                    <div className="text-sm text-slate-500 font-medium">at Deerwood</div>
                  </div>
                  
                  {/* Navigation Links */}
                  {NAVIGATION_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                        location === link.href
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:shadow-lg'
                      }`}
                    >
                      <span className="relative">
                        {link.label}
                        <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${
                          location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></div>
                      </span>
                    </Link>
                  ))}
                  
                  {/* Call Button */}
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105" 
                      asChild
                    >
                      <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call {SITE_CONFIG.contact.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
