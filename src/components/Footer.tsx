import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-accent-400 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-navy-900" />
              </div>
              <span className="text-2xl font-bold text-white">TradeX</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Your one-stop marketplace for buying, selling, finding jobs, and services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Buy
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Sell
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-accent-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-accent-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Trading Street, Market City, TR 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-accent-400 flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-accent-400 flex-shrink-0" />
                <span className="text-gray-400">contact@tradex.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TradeX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};