import React, { useState, useEffect } from 'react';
import { Plus, X, Search, MapPin, Phone, Mail, Edit, Trash2, ChevronDown, UserCog } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Customers = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('token');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      additionalDetail: ''
    }
  });

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/admin/getAllCustomers`, {
        headers: { Authorization: `${token}` }
      });
      setCustomers(response.data.customers);
    } catch (error) {
      toast.error('Failed to fetch customers');
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search term
    let result = customers;
    
    if (searchTerm) {
      result = result.filter(customer => 
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phoneNo.includes(searchTerm)
      );
    }

    setFilteredCustomers(result);
  }, [customers, searchTerm]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Create new customer
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/v1/admin/createCustomer`, formData, {
        headers: { Authorization: `${token}` }
      });
      toast.success('Customer created successfully');
      setShowAddModal(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          additionalDetail: ''
        }
      });
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create customer');
      console.error('Error creating customer:', error);
    }
  };

  // Update customer
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${BASE_URL}/api/v1/admin/updateCustomer/${selectedCustomer._id}`, 
        formData,
        {
          headers: { Authorization: `${token}` }
        }
      );
      toast.success('Customer updated successfully');
      setShowEditModal(false);
      setSelectedCustomer(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          additionalDetail: ''
        }
      });
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update customer');
      console.error('Error updating customer:', error);
    }
  };

  // Delete customer
  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`${BASE_URL}/api/v1/admin/deleteCustomer/${customerId}`, {
          headers: { Authorization: `${token}` }
        });
        toast.success('Customer deleted successfully');
        fetchCustomers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete customer');
        console.error('Error deleting customer:', error);
      }
    }
  };

  // Open edit modal
  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNo: customer.phoneNo,
      address: customer.address || {
        street: '',
        city: '',
        state: '',
        pincode: '',
        additionalDetail: ''
      }
    });
    setShowEditModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track your customer information
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Customer
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">Loading...</td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">No customers found</td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <MapPin className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phoneNo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.address ? (
                          <>
                            {customer.address.street}
                            <br />
                            {customer.address.city}, {customer.address.state} {customer.address.pincode}
                          </>
                        ) : (
                          'No address'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button 
                            onClick={() => handleEditClick(customer)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCustomer(customer._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Customer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[500px] max-w-full p-8 relative">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Customer</h2>
              <form onSubmit={handleCreateCustomer} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Create Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Customer Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[500px] max-w-full p-8 relative">
              <button 
                onClick={() => setShowEditModal(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Customer</h2>
              <form onSubmit={handleUpdateCustomer} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Update Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;