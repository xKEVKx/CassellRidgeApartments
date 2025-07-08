import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { SITE_CONFIG } from "@/lib/constants";

export default function Contact() {
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Ready to make Bicycle Club Apartments your home?
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="text-green-700 mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">
                    Main: <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-green-700 hover:underline">
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </p>
                  <p className="text-gray-600">Fax: {SITE_CONFIG.contact.fax}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-green-700 mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">
                    <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-green-700 hover:underline">
                      {SITE_CONFIG.contact.email}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-green-700 mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    {SITE_CONFIG.contact.address.street}<br />
                    {SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} {SITE_CONFIG.contact.address.zip}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-green-700 mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Office Hours</h3>
                  <p className="text-gray-600">
                    {SITE_CONFIG.contact.hours.weekdays}<br />
                    {SITE_CONFIG.contact.hours.wednesday}<br />
                    {SITE_CONFIG.contact.hours.weekend}<br />
                    {SITE_CONFIG.contact.hours.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <ContactForm title="Schedule a Visit" />
        </div>
        
        {/* Map */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe 
            src={SITE_CONFIG.mapEmbedUrl}
            width="100%" 
            height="400" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="The Grove at Deerwood Location"
          />
        </div>
      </div>
    </div>
  );
}
