import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE_CONFIG, NAVIGATION_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-300">
              {SITE_CONFIG.tagline} in North Knoxville, Tennessee.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resident Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://discover.matterport.com/space/EQrEazqXEcw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  2-Bedroom Virtual Tour
                </a>
              </li>
              <li>
                <a href="https://discover.matterport.com/space/ZJ5VJ6eqLZk" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  3-Bedroom Virtual Tour
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/floor-plans" className="text-gray-300 hover:text-white transition-colors">
                  Floor Plans
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{SITE_CONFIG.contact.address.street}</p>
                  <p>{SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} {SITE_CONFIG.contact.address.zip}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-blue-400 hover:underline">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-blue-400 hover:underline">
                  Email Us
                </a>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{SITE_CONFIG.contact.hours.weekdays}</p>
                  <p>{SITE_CONFIG.contact.hours.wednesday}</p>
                  <p>{SITE_CONFIG.contact.hours.weekend}</p>
                  <p>{SITE_CONFIG.contact.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
