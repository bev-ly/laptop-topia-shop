
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { laptops, brands } from '@/data/products';
import { Button } from '@/components/ui/button';

const LaptopsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandParam = queryParams.get('brand') || 'All';
  
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [filteredProducts, setFilteredProducts] = useState(laptops);
  
  // Apply filters when dependencies change
  useEffect(() => {
    let filtered = laptops;
    
    // Filter by brand
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(laptop => laptop.brand === selectedBrand);
    }
    
    // Filter by price range
    filtered = filtered.filter(laptop => 
      laptop.price >= priceRange[0] && laptop.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [selectedBrand, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Laptops</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          
          {/* Brand filter */}
          <div className="mb-6">
            <h3 className="font-medium text-sm text-gray-500 mb-2">Brand</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="radio"
                    id={`brand-${brand}`}
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="mr-2 h-4 w-4 text-tech-blue focus:ring-tech-blue border-gray-300"
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range filter */}
          <div className="mb-6">
            <h3 className="font-medium text-sm text-gray-500 mb-2">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="3000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full"
              />
              
              <input
                type="range"
                min="0"
                max="3000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setPriceRange([
                      isNaN(value) ? 0 : Math.max(0, value),
                      priceRange[1]
                    ]);
                  }}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setPriceRange([
                      priceRange[0],
                      isNaN(value) ? 3000 : Math.min(3000, value)
                    ]);
                  }}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          
          {/* Reset filters */}
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              setSelectedBrand('All');
              setPriceRange([0, 3000]);
            }}
          >
            Reset Filters
          </Button>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{filteredProducts.length}</span> products found
              </p>
              <select
                className="text-sm border rounded px-2 py-1"
                onChange={(e) => {
                  const value = e.target.value;
                  let sortedProducts = [...filteredProducts];
                  
                  if (value === 'price-asc') {
                    sortedProducts.sort((a, b) => a.price - b.price);
                  } else if (value === 'price-desc') {
                    sortedProducts.sort((a, b) => b.price - a.price);
                  } else if (value === 'name-asc') {
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                  } else if (value === 'name-desc') {
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                  }
                  
                  setFilteredProducts(sortedProducts);
                }}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default LaptopsPage;
