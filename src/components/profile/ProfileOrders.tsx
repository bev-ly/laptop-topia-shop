
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

const ProfileOrders = () => {
  const { orders, cancelOrder, deleteOrder, bulkDeleteOrders } = useOrders();
  const { toast } = useToast();
  
  // State for order filter
  const [filter, setFilter] = useState('all');
  // State for selected orders (for bulk actions)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // Filter orders based on selected filter
  const filteredOrders = filter === 'all' 
    ? orders 
    : filter === 'active'
    ? orders.filter(order => order.status !== 'cancelled' && order.status !== 'delivered')
    : filter === 'cancelled'
    ? orders.filter(order => order.status === 'cancelled')
    : orders.filter(order => order.status === filter);
  
  // Handle order cancellation
  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully.",
      });
    }
  };
  
  // Handle order deletion (only for cancelled orders)
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order from your history? This action cannot be undone.')) {
      deleteOrder(orderId);
      // Remove from selected orders if it was selected
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
      toast({
        title: "Order Deleted",
        description: "Your order has been removed from your history.",
      });
    }
  };

  // Handle bulk delete for selected orders
  const handleBulkDelete = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select orders to delete.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedOrders.length} selected order(s)? This action cannot be undone.`)) {
      bulkDeleteOrders(selectedOrders);
      setSelectedOrders([]);
      toast({
        title: "Orders Deleted",
        description: `${selectedOrders.length} order(s) have been removed from your history.`,
      });
    }
  };

  // Toggle selection of a single order
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Toggle selection of all filtered orders
  const toggleAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Order History</h2>
        
        {/* Order Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
            size="sm"
          >
            All Orders
          </Button>
          <Button 
            variant={filter === 'active' ? 'default' : 'outline'} 
            onClick={() => setFilter('active')}
            size="sm"
          >
            Active
          </Button>
          <Button 
            variant={filter === 'processing' ? 'default' : 'outline'} 
            onClick={() => setFilter('processing')}
            size="sm"
          >
            Processing
          </Button>
          <Button 
            variant={filter === 'shipped' ? 'default' : 'outline'} 
            onClick={() => setFilter('shipped')}
            size="sm"
          >
            Shipped
          </Button>
          <Button 
            variant={filter === 'delivered' ? 'default' : 'outline'} 
            onClick={() => setFilter('delivered')}
            size="sm"
          >
            Delivered
          </Button>
          <Button 
            variant={filter === 'cancelled' ? 'default' : 'outline'} 
            onClick={() => setFilter('cancelled')}
            size="sm"
          >
            Cancelled
          </Button>
        </div>
        
        {/* Bulk Actions */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                onCheckedChange={toggleAllOrders}
                id="select-all"
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All
              </label>
            </div>
            
            {selectedOrders.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkDelete}
                className="flex items-center space-x-1"
              >
                <Trash2 size={16} />
                <span>Delete Selected ({selectedOrders.length})</span>
              </Button>
            )}
          </div>
        )}
        
        {/* Orders Table */}
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 w-10">
                    {/* Table header checkbox column */}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-4">
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleOrderSelection(order.id)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id.substring(0, 8)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/order-confirmation/${order.id}`}
                          className="text-tech-blue hover:text-blue-700"
                        >
                          View
                        </Link>
                        
                        {/* Show cancel button for non-cancelled, non-delivered orders */}
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        )}
                        
                        {/* Show delete button only for cancelled orders */}
                        {order.status === 'cancelled' && (
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">No orders found with the selected filter.</p>
            {filter !== 'all' && (
              <Button variant="outline" onClick={() => setFilter('all')}>
                View All Orders
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Cancelled Orders Section */}
      {filter === 'cancelled' && orders.some(order => order.status === 'cancelled') && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Manage Cancelled Orders</h2>
          <p className="text-gray-600 mb-4">
            You can permanently delete cancelled orders from your order history. This action cannot be undone.
          </p>
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all cancelled orders? This action cannot be undone.')) {
                  bulkDeleteOrders(orders
                    .filter(order => order.status === 'cancelled')
                    .map(order => order.id)
                  );
                  
                  toast({
                    title: "Cancelled Orders Deleted",
                    description: "All cancelled orders have been removed from your history.",
                  });
                }
              }}
            >
              Delete All Cancelled Orders
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;
