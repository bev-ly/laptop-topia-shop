
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem } from './CartContext';

// Types
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], total: number, address: Order['address'], paymentMethod: string) => Order;
  cancelOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  bulkDeleteOrders: (orderIds: string[]) => void;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load orders from localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Create a new order
  const createOrder = (
    items: CartItem[], 
    total: number, 
    address: Order['address'], 
    paymentMethod: string
  ): Order => {
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 11),
      items,
      total,
      date: new Date().toISOString(),
      status: 'processing',
      address,
      paymentMethod
    };

    setOrders([newOrder, ...orders]);
    return newOrder;
  };

  // Get order by ID
  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  // Update order status
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  // Cancel an order
  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
  };

  // Delete a single order
  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  // Delete multiple orders (bulk delete)
  const bulkDeleteOrders = (orderIds: string[]) => {
    setOrders(prevOrders => prevOrders.filter(order => !orderIds.includes(order.id)));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      cancelOrder,
      deleteOrder,
      bulkDeleteOrders,
      getOrderById,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use order context
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
