
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { laptops } from '@/data/products';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filteredLaptops = laptops.filter(laptop =>
        laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Navigate to laptops page with search query
      navigate(`/laptops?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search laptops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
    </form>
  );
}
