import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to continue to checkout.",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to checkout.",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/checkout');
  };

  const handleItemSelect = (productId: number) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getSelectedTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.product.id))
      .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const groupedItems = cartItems.reduce((groups, item) => {
    const name = item.product.name;
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(item);
    return groups;
  }, {} as Record<string, typeof cartItems>);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-background">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any laptops to your cart yet.</p>
          <Button asChild>
            <Link to="/laptops">Browse Laptops</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-muted/50">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {Object.entries(groupedItems).map(([productName, items]) => (
              <div key={productName} className="border-b last:border-0">
                <div className="p-4 bg-muted/20">
                  <h3 className="font-medium">{productName}</h3>
                </div>
                {items.map((item) => (
                  <div key={item.product.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t first:border-0">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <Checkbox 
                          checked={selectedItems.includes(item.product.id)}
                          onCheckedChange={() => handleItemSelect(item.product.id)}
                          className="mr-4"
                        />
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-contain mr-4"
                        />
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:text-primary"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center">
                      ${item.product.price.toLocaleString()}
                    </div>
                    
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-accent"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 h-8 text-center border-t border-b focus:outline-none dark-text-force"
                        />
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-accent"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-right flex items-center justify-end space-x-2">
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
            <div className="p-4 flex justify-between bg-muted/20">
              <Button 
                variant="ghost" 
                onClick={clearCart} 
                className="text-muted-foreground flex items-center gap-1"
              >
                <Trash2 size={16} />
                Clear Cart
              </Button>
              <Link to="/laptops">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="lg:w-80">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Selected Items ({selectedItems.length})</span>
                <span>${getSelectedTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (10%)</span>
                <span>${(getSelectedTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(getSelectedTotal() * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <Button onClick={handleCheckout} className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
