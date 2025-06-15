import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form data for profile editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  
  // Get user data from localStorage (or context if you have it)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (userData) {
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || ''
      });
      
      // Fetch additional user data from backend
      fetchUserData();
    }
    
    setLoading(false);
  }, []);
  
  // Fetch user data, addresses and orders
  const fetchUserData = async () => {
    try {
      // In a real app, you would fetch this data from your API
      // For now, we'll just simulate it with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock addresses
      setAddresses([
        {
          id: 1,
          label: 'Home',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          isDefault: true
        },
        {
          id: 2,
          label: 'Work',
          street: '456 Market St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94103',
          isDefault: false
        }
      ]);
      
      // Mock orders
      setOrders([
        {
          id: 101,
          orderNumber: 'ORD-1234',
          createdAt: '2023-06-01T15:30:00Z',
          total: 25.99,
          status: 'Delivered',
          items: [
            { id: 1, name: 'Pepperoni Pizza', quantity: 1, price: 15.99 },
            { id: 2, name: 'Garlic Knots', quantity: 1, price: 5.99 },
            { id: 3, name: 'Soda', quantity: 1, price: 2.99 }
          ]
        },
        {
          id: 102,
          orderNumber: 'ORD-1235',
          createdAt: '2023-06-10T18:45:00Z',
          total: 35.98,
          status: 'Processing',
          items: [
            { id: 1, name: 'Supreme Pizza', quantity: 1, price: 18.99 },
            { id: 2, name: 'Buffalo Wings', quantity: 1, price: 12.99 },
            { id: 3, name: 'Soda', quantity: 2, price: 1.99 }
          ]
        }
      ]);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    }
  };
  
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // In a real app, you would make an API call here
      // For now, just update the local state
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user data
      const updatedUser = {
        ...user,
        ...formData
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'info' 
            ? 'text-red-600 border-b-2 border-red-600' 
            : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('info')}
        >
          Personal Info
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'addresses' 
            ? 'text-red-600 border-b-2 border-red-600' 
            : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'orders' 
            ? 'text-red-600 border-b-2 border-red-600' 
            : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </button>
      </div>
      
      {/* Personal Info Tab */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Full Name</h3>
                <p className="text-gray-800">{user?.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Email Address</h3>
                <p className="text-gray-800">{user?.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Phone Number</h3>
                <p className="text-gray-800">{user?.phoneNumber || 'Not provided'}</p>
              </div>
              
              <div className="pt-4 border-t mt-2">
                <Link to="/forgot-password" className="text-red-600 hover:text-red-800">
                  Change Password
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Delivery Addresses</h2>
            <button
              onClick={() => toast.info('Add address feature coming soon!')}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Add Address
            </button>
          </div>
          
          {addresses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You don't have any saved addresses yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map(address => (
                <div 
                  key={address.id} 
                  className={`border rounded-lg p-4 ${address.isDefault ? 'bg-red-50 border-red-200' : 'bg-white'}`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {address.label}
                        {address.isDefault && (
                          <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-700 mt-1">{address.street}</p>
                      <p className="text-gray-700">{address.city}, {address.state} {address.zipCode}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toast.info('Edit feature coming soon!')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toast.info('Delete feature coming soon!')}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Order History</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You haven't placed any orders yet.</p>
              <Link to="/menu" className="mt-2 text-red-600 hover:text-red-800 font-medium block">
                Browse our menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Order #</p>
                      <p className="font-medium">{order.orderNumber}</p>
                    </div>
                    
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                    
                    <div className="mb-2 sm:mb-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-3">Items</h3>
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <span className="font-medium mr-2">{item.quantity}x</span>
                            <span>{item.name}</span>
                          </div>
                          <div>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t mt-4 pt-3">
                      <button 
                        onClick={() => toast.info('Order details feature coming soon!')}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        View Order Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;