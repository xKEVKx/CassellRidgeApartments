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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 group" onClick={handleLogoClick}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="/images/Cassell Ridge Logo_Transparent.png" 
                    alt="Cassell Ridge Apartments Logo" 
                    className="w-auto transition-all duration-300 group-hover:scale-105"
                    style={{ height: '200px' }}
                  />
                  <div className="absolute -inset-2 bg-gradient-to-br from-warm-brown-500/10 to-warm-brown-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 flex items-center">
              {/* Create unified menu with all items */}
              <div className="flex items-center space-x-6">
                {/* Navigation Links */}
                {NAVIGATION_LINKS.map((link, index) => (
                  <div key={link.href} className="relative">
                    {link.subItems ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            className={`group px-4 py-2 text-sm font-semibold transition-all duration-300 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent outline-none border-none ${
                              link.subItems.some(subItem => location === subItem.href)
                                ? 'text-warm-brown-700'
                                : 'text-slate-700 hover:text-warm-brown-600'
                            }`}
                          >
                            <span className="relative flex items-center">
                              {link.label}
                              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                              <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                link.subItems.some(subItem => location === subItem.href) ? 'w-full' : 'w-0 group-hover:w-full'
                              }`}></div>
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl">
                          {link.subItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.href} asChild>
                              <Link 
                                href={subItem.href}
                                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                  location === subItem.href
                                    ? 'text-warm-brown-700 font-semibold bg-warm-brown-50'
                                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-warm-brown-50 hover:to-warm-brown-50 hover:text-warm-brown-600 hover:shadow-sm'
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      link.href.startsWith('#') || link.href.startsWith('/#') ? (
                        <a
                          href={link.href}
                          className={`group px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                            location === link.href
                              ? 'text-warm-brown-700'
                              : 'text-slate-700 hover:text-warm-brown-600'
                          }`}
                        >
                          <span className="relative flex items-center">
                            {link.isIcon ? (
                              <>
                                <Home className="w-5 h-5" />
                                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                  location === link.href ? 'w-5' : 'w-0 group-hover:w-5'
                                }`}></div>
                              </>
                            ) : (
                              <>
                                {link.label}
                                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                  location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></div>
                              </>
                            )}
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={link.href === '/' ? handleHomeClick : undefined}
                          className={`group px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                            location === link.href
                              ? 'text-warm-brown-700'
                              : 'text-slate-700 hover:text-warm-brown-600'
                          }`}
                        >
                          <span className="relative flex items-center">
                            {link.isIcon ? (
                              <>
                                <Home className="w-5 h-5" />
                                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                  location === link.href ? 'w-5' : 'w-0 group-hover:w-5'
                                }`}></div>
                              </>
                            ) : (
                              <>
                                {link.label}
                                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                  location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></div>
                              </>
                            )}
                          </span>
                        </Link>
                      )
                    )}
                    {/* Separator after each navigation item */}
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-px h-4 bg-slate-300"></div>
                  </div>
                ))}
                
                {/* External Links - same structure as navigation links */}
                {EXTERNAL_LINKS.map((link, index) => (
                  <div key={link.href} className="relative hidden xl:block">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-4 py-2 rounded-2xl text-sm font-semibold text-slate-700 hover:text-warm-brown-600 transition-all duration-300"
                    >
                      <span className="relative flex items-center">
                        {link.label}
                        <ExternalLink className="w-3 h-3 ml-1" />
                        <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 w-0 group-hover:w-full"></div>
                      </span>
                    </a>
                    {/* Separator after each external link except the last one */}
                    {index < EXTERNAL_LINKS.length - 1 && (
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-px h-4 bg-slate-300"></div>
                    )}
                  </div>
                ))}
                
                {/* Call Button - same structure as other items */}
                <div className="relative">
                  <Button 
                    className="group bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 hover:from-warm-brown-600 hover:to-warm-brown-600 text-white px-3 xl:px-4 py-2 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105" 
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
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="group bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl text-slate-700 hover:text-warm-brown-600 transition-all duration-300"
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
                      className="h-18 w-auto"
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
                                  ? 'bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 text-white shadow-xl'
                                  : 'text-slate-700 hover:bg-slate-100 hover:text-warm-brown-600 hover:shadow-lg'
                              }`}
                            >
                              <span className="relative">
                                {subItem.label}
                                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                  location === subItem.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></div>
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        link.href.startsWith('#') || link.href.startsWith('/#') ? (
                          <a
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`group px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 block ${
                              location === link.href
                                ? 'bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 text-white shadow-xl'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-warm-brown-600 hover:shadow-lg'
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
                              <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                              }`}></div>
                            </span>
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={(e) => {
                              if (link.href === '/' && location === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                              setIsOpen(false);
                            }}
                            className={`group px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 block ${
                              location === link.href
                                ? 'bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 text-white shadow-xl'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-warm-brown-600 hover:shadow-lg'
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
                              <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 transition-all duration-300 ${
                                location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                              }`}></div>
                            </span>
                          </Link>
                        )
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
                      className="group px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 block text-slate-700 hover:bg-slate-100 hover:text-warm-brown-600 hover:shadow-lg"
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
                      className="w-full bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 hover:from-warm-brown-600 hover:to-warm-brown-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105" 
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
