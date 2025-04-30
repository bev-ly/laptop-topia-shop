
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Image } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <div className="product-card-hover bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-3 aspect-h-2 bg-gray-100 flex justify-center items-center relative h-48">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-tech-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
              <Image className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Image not available</p>
            </div>
          )}
          
          <img
            src={product.image}
            alt={product.name}
            className={`object-contain w-full h-full py-4 transition-opacity duration-300 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          
          <div className="flex items-baseline mt-2">
            <span className="text-xl font-bold text-tech-blue">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600 font-medium">
              {product.specs.processor}
            </div>
            <Button 
              size="sm" 
              onClick={handleAddToCart} 
              className="flex items-center gap-1"
            >
              <ShoppingCart size={16} />
              <span className="sr-only sm:not-sr-only sm:ml-1">Add</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
