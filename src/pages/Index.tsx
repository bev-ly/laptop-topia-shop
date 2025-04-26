
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { laptops } from '@/data/products';

const Index = () => {
  // Select featured products (e.g., first 4)
  const featuredProducts = laptops.slice(0, 4);
  
  // Select products on sale (those with originalPrice)
  const onSaleProducts = laptops.filter(laptop => laptop.originalPrice);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tech-blue to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Find Your Perfect Laptop at TechTopia
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Browse our extensive collection of premium laptops from all major brands.
                Get the best tech at the best prices, with expert support.
              </p>
              <div className="flex space-x-4">
                <Button asChild size="lg" className="bg-white text-tech-blue hover:bg-blue-50">
                  <Link to="/laptops">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/brands">Browse Brands</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10 animate-fade-in">
              <img 
                src="/placeholder.svg" 
                alt="Featured laptop" 
                className="max-w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Laptops</h2>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-tech-blue hover:bg-blue-700">
              <Link to="/laptops">View All Laptops</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We carry all the major laptop brands, ensuring you'll find exactly what you're looking for.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
            {["Apple", "Dell", "HP", "Lenovo", "ASUS", "Microsoft"].map((brand) => (
              <Link 
                key={brand} 
                to={`/laptops?brand=${brand}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
              >
                <span className="text-xl font-medium text-gray-800">{brand}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/brands">View All Brands</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {onSaleProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">Special Offers</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Limited-time deals on premium laptops. Don't miss these exclusive savings!
            </p>
            <ProductGrid products={onSaleProducts} />
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TechTopia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-tech-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tech-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                All our laptops are genuine products with full manufacturer warranties.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-tech-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tech-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Prices</h3>
              <p className="text-gray-600">
                We constantly monitor prices to ensure you get the best deals.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-tech-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tech-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our tech experts are available to help you find the perfect laptop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-tech-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest product updates, tech news, and exclusive offers.
            </p>
            <form className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
                required
              />
              <Button type="submit" className="rounded-l-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
