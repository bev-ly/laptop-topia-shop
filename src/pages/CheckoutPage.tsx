
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA'
    },
    paymentMethod: 'credit-card'
  });
  
  // Show/hide COD payment option based on selected country
  const [showCOD, setShowCOD] = useState(false);
  
  useEffect(() => {
    // Only show COD payment option for Philippines
    setShowCOD(form.address.country === 'PHL');
    
    // If user switches from Philippines to another country and had COD selected,
    // change to credit card payment method
    if (form.address.country !== 'PHL' && form.paymentMethod === 'cod') {
      setForm({
        ...form,
        paymentMethod: 'credit-card'
      });
    }
  }, [form.address.country]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm({
        ...form,
        [parent]: {
          ...form[parent as keyof typeof form] as Record<string, unknown>,
          [child]: value
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };
  
  // Handle country change from the Select component
  const handleCountryChange = (value: string) => {
    setForm({
      ...form,
      address: {
        ...form.address,
        country: value
      }
    });
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setForm({
      ...form,
      paymentMethod: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing payment
    setTimeout(() => {
      try {
        // Create the order - properly capture the returned order object
        const newOrder = createOrder(
          cartItems,
          cartTotal * 1.1, // Total with tax
          form.address,
          form.paymentMethod
        );
        
        // Clear cart
        clearCart();
        
        // Show success message
        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been placed and is being processed.",
        });
        
        // Redirect to confirmation page
        navigate(`/order-confirmation/${newOrder.id}`);
      } catch (error) {
        toast({
          title: "Error Processing Order",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }, 1500);
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-background">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address.street" className="block text-sm font-medium mb-1">
                    Street Address
                  </label>
                  <Input
                    type="text"
                    id="address.street"
                    name="address.street"
                    value={form.address.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <Input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={form.address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.state" className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <Input
                      type="text"
                      id="address.state"
                      name="address.state"
                      value={form.address.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address.zip" className="block text-sm font-medium mb-1">
                      ZIP / Postal Code
                    </label>
                    <Input
                      type="text"
                      id="address.zip"
                      name="address.zip"
                      value={form.address.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address.country" className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <Select
                      value={form.address.country}
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger className="w-full text-white">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-white">
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="CAN">Canada</SelectItem>
                        <SelectItem value="MEX">Mexico</SelectItem>
                        <SelectItem value="GBR">United Kingdom</SelectItem>
                        <SelectItem value="PHL">Philippines</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <Select
                  value={form.paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                >
                  <SelectTrigger className="w-full text-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-white">
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    {showCOD && <SelectItem value="cod">Cash On Delivery</SelectItem>}
                  </SelectContent>
                </Select>
                
                {form.paymentMethod === 'credit-card' && (
                  <div className="mt-4 space-y-4 pt-4 border-t">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <Input
                        type="text"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                          Expiry Date
                        </label>
                        <Input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                          CVC
                        </label>
                        <Input
                          type="text"
                          id="cvc"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {form.paymentMethod === 'cod' && (
                  <div className="mt-4 pt-4 border-t text-sm">
                    <p>Cash on Delivery is available for orders shipping to the Philippines only.</p>
                    <p className="mt-2">Payment will be collected at the time of delivery.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:hidden">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="lg:w-80">
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex py-2 border-b">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="text-sm font-medium text-black dark:text-white">{item.product.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{item.product.brand}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-black dark:text-gray-200">{item.quantity} x ${item.product.price.toLocaleString()}</span>
                      <span className="text-sm font-medium text-black dark:text-white">${(item.quantity * item.product.price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">Subtotal</span>
                <span className="text-black dark:text-white">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">Shipping</span>
                <span className="text-black dark:text-white">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">Tax (10%)</span>
                <span className="text-black dark:text-white">${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span className="text-black dark:text-white">Total</span>
                <span className="text-black dark:text-white">${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
