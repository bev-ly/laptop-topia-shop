
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// Profile Sub Pages
import ProfileDashboard from '@/components/profile/ProfileDashboard';
import ProfileOrders from '@/components/profile/ProfileOrders';
import ProfileSettings from '@/components/profile/ProfileSettings';

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location.pathname]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect due to the effect
  }
  
  // Determine active tab based on current URL
  const path = location.pathname;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="bg-tech-blue/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-tech-blue font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/profile"
                    className={`block px-4 py-2 rounded-md text-sm ${
                      path === '/profile' 
                        ? 'bg-tech-blue text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile/orders"
                    className={`block px-4 py-2 rounded-md text-sm ${
                      path.includes('/profile/orders') 
                        ? 'bg-tech-blue text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile/settings"
                    className={`block px-4 py-2 rounded-md text-sm ${
                      path.includes('/profile/settings') 
                        ? 'bg-tech-blue text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Account Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<ProfileDashboard />} />
            <Route path="/orders" element={<ProfileOrders />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
