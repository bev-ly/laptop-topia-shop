import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';

const Navbar = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">TechTopia</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <Link to="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link to="/laptops" className="text-foreground hover:text-primary">
              All Laptops
            </Link>
          </div>

          {/* User controls */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/profile" className="text-foreground hover:text-primary p-2 rounded-full hover:bg-accent">
              <User size={20} />
            </Link>
            <Link to="/cart" className="text-foreground hover:text-primary p-2 rounded-full hover:bg-accent relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-gray-700 mr-4 relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-tech-blue text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-tech-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tech-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tech-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/laptops"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tech-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              All Laptops
            </Link>
            <Link
              to="/brands"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tech-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tech-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-tech-blue hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
