
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/CartContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="py-6">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="laptop-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
