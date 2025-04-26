
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = getProductById(parseInt(id || '0'));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">Sorry, the product you're looking for does not exist.</p>
        <Button asChild>
          <Link to="/laptops">Browse All Laptops</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link to="/laptops" className="flex items-center text-gray-500 hover:text-tech-blue">
            <ArrowLeft size={16} className="mr-1" />
            Back to Laptops
          </Link>
        </Button>
      </nav>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto max-h-80 object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-tech-blue">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Processor</h3>
                <p className="mt-1 text-base text-gray-900">{product.specs.processor}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Memory</h3>
                <p className="mt-1 text-base text-gray-900">{product.specs.memory}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Storage</h3>
                <p className="mt-1 text-base text-gray-900">{product.specs.storage}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Display</h3>
                <p className="mt-1 text-base text-gray-900">{product.specs.display}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Graphics</h3>
                <p className="mt-1 text-base text-gray-900">{product.specs.graphics}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button 
                onClick={handleAddToCart} 
                className="w-full flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>

              <Button 
                variant="outline" 
                onClick={handleBuyNow}
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">
          The {product.name} is a powerful and versatile laptop designed for {product.brand === 'Apple' ? 'creators and professionals' : 'productivity and performance'}. 
          Featuring a {product.specs.processor} processor, {product.specs.memory}, and {product.specs.storage}, this laptop delivers exceptional speed and responsiveness for all your computing needs.
          The {product.specs.display} display provides stunning visuals with vibrant colors and sharp details, while the {product.specs.graphics} graphics ensure smooth performance for everything from everyday tasks to creative work.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Whether you're working on demanding projects, enjoying multimedia content, or staying productive on the go, the {product.name} is engineered to excel. With its premium build quality, innovative features, and powerful specifications, this laptop represents the best of {product.brand}'s commitment to excellence.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
