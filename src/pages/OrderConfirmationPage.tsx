import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/contexts/OrderContext';

const OrderConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrders();
  
  const order = orders.find(order => order.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 dark-text-force">Order Not Found</h1>
        <p className="mb-8 dark-text-force">We couldn't find the order you're looking for.</p>
        <Button asChild>
          <Link to="/profile/orders">View Your Orders</Link>
        </Button>
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(orderDate);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-background rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 border-b border-green-100 dark:border-green-900/30">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Order Confirmed!
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Thank you for your order. We've received your purchase and will process it soon.
          </p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-lg font-bold dark-text-force">Order Details</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Order #{order.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Order Date</h3>
              <p className="text-gray-900 dark:text-white">{formattedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Order Status</h3>
              <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Processing
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Method</h3>
              <p className="text-gray-900">{order.paymentMethod === 'credit-card' ? 'Credit Card' : 
                order.paymentMethod === 'paypal' ? 'PayPal' : 
                order.paymentMethod}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Shipping Address</h3>
              <p className="text-gray-900">
                {order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}, {order.address.country}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-4 dark-text-force">Items</h3>
          <div className="border rounded-md overflow-hidden mb-6">
            {order.items.map((item, index) => (
              <div 
                key={item.product.id} 
                className={`flex py-4 px-6 dark-text-force ${
                  index !== order.items.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-4 flex-1 flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-500">{item.product.brand}</p>
                  </div>
                  <div className="flex items-end flex-col">
                    <p className="text-sm text-gray-500">{item.quantity} × ${item.product.price.toLocaleString()}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ${(item.quantity * item.product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-md p-6">
            <h3 className="text-lg font-bold mb-4 dark-text-force">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${(order.total / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                <span className="text-gray-900 dark:text-white">${(order.total - order.total / 1.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span className="dark-text-force">Total</span>
                <span className="text-lg dark-text-force">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/20 p-6 border-t flex flex-col sm:flex-row gap-4 justify-center sm:justify-between">
          <Button asChild variant="outline">
            <Link to="/profile/orders">View Order History</Link>
          </Button>
          <Button asChild>
            <Link to="/laptops">Continue Shopping</Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm">
        <p className="mb-2 dark-text-force">
          A confirmation email has been sent to your email address.
        </p>
        <p className="dark-text-force">
          If you have any questions, please contact our support team at support@techtopia.com
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
