import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, ExternalLink, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SITE_CONFIG, NAVIGATION_LINKS, EXTERNAL_LINKS } from "@/lib/constants";

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
                  <img 
                    src="/images/bicycle-club-header-logo.png" 
                    alt="Bicycle Club Apartments Logo" 
                    className="h-8 w-auto transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 flex items-center space-x-6">
              {NAVIGATION_LINKS.map((link, index) => (
                <div key={link.href} className="relative">
                  {link.subItems ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost"
                          style={{ background: 'transparent !important' }}
                          className={`group px-3 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 [&]:!bg-transparent [&]:hover:!bg-transparent [&]:focus:!bg-transparent [&[data-state=open]]:!bg-transparent [&]:active:!bg-transparent ${
                            link.subItems.some(subItem => location === subItem.href)
                              ? 'text-emerald-700'
                              : 'text-slate-700 hover:text-emerald-600'
                          }`}
                        >
                          <span className="relative flex items-center">
                            {link.label}
                            <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                            <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${
                              link.subItems.some(subItem => location === subItem.href) ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></div>
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl">
                        {link.subItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.href} asChild>
                            <Link 
                              href={subItem.href}
                              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                location === subItem.href
                                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 hover:shadow-sm'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={link.href}
                      className={`group px-3 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        location === link.href
                          ? 'text-emerald-700'
                          : 'text-slate-700 hover:text-emerald-600'
                      }`}
                    >
                      <span className="relative flex items-center">
                        {link.isIcon ? (
                          <Home className="w-5 h-5" />
                        ) : (
                          link.label
                        )}
                        <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${
                          location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></div>
                      </span>
                    </Link>
                  )}
                  {/* Subtle separator between menu items */}
                  {index < NAVIGATION_LINKS.length - 1 && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-px h-4 bg-slate-300"></div>
                  )}
                </div>
              ))}
              
              {/* External Links - Hidden on smaller screens */}
              <div className="hidden xl:flex space-x-4">
                {EXTERNAL_LINKS.map((link, index) => (
                  <div key={link.href} className="relative">
                    <Button
                      variant="ghost"
                      className="group px-3 py-2 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:shadow-lg transition-all duration-300"
                      asChild
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <span className="relative flex items-center">
                          {link.label}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </span>
                      </a>
                    </Button>
                    {/* Subtle separator between external links */}
                    {index < EXTERNAL_LINKS.length - 1 && (
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-px h-4 bg-slate-300"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="ml-6 pl-6 border-l border-slate-200">
                <Button 
                  className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-3 xl:px-4 py-2 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105" 
                  asChild
                >
                  <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                    <Phone className="w-4 h-4 xl:mr-2 transition-transform group-hover:scale-110" />
                    <span className="hidden xl:inline">Call Now</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
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
                  <div className="flex justify-center pb-4 border-b border-slate-200">
                    <img 
                      src="/images/bicycle-club-header-logo.png" 
                      alt="Bicycle Club Apartments Logo" 
                      className="h-12 w-auto"
                    />
                  </div>
                  
                  {/* Navigation Links */}
                  {NAVIGATION_LINKS.map((link) => (
                    <div key={link.href} className="space-y-2">
                      {link.subItems ? (
                        <div className="space-y-2">
                          <div className="px-6 py-3 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                            {link.label}
                          </div>
                          {link.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`group px-6 py-3 rounded-2xl text-base font-medium transition-all duration-300 block ${
                                location === subItem.href
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl'
                                  : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:shadow-lg'
                              }`}
                            >
                              <span className="relative">
                                {subItem.label}
                                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${
                                  location === subItem.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></div>
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`group px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 block ${
                            location === link.href
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:shadow-lg'
                          }`}
                        >
                          <span className="relative flex items-center">
                            {link.isIcon ? (
                              <>
                                <Home className="w-5 h-5 mr-3" />
                                Home
                              </>
                            ) : (
                              link.label
                            )}
                            <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${
                              location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></div>
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  {/* External Links */}
                  {EXTERNAL_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="group px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 block text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:shadow-lg"
                    >
                      <span className="relative flex items-center">
                        {link.label}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </span>
                    </a>
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
