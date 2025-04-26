
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-tech-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">TechTopia</h2>
            <p className="text-gray-300">
              Your one-stop destination for premium laptops from all major brands.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/laptops" className="text-gray-300 hover:text-white">All Laptops</Link>
              </li>
              <li>
                <Link to="/brands" className="text-gray-300 hover:text-white">Brands</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-300 hover:text-white">Deals</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white">My Account</Link>
              </li>
              <li>
                <Link to="/profile/orders" className="text-gray-300 hover:text-white">Order History</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white">Shopping Cart</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white">Shipping</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">Returns</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} TechTopia. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
