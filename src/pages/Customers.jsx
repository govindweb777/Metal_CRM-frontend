import React, { useState } from 'react';
import { Plus, Search, MapPin, Phone, Mail, Edit, Trash2 } from 'lucide-react';

const Customers = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        pincode: '10001'
      },
      totalOrders: 15,
      lastOrder: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1987654321',
      address: {
        street: '456 Park Ave',
        city: 'Los Angeles',
        state: 'CA',
        pincode: '90001'
      },
      totalOrders: 8,
      lastOrder: '2024-03-14'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1122334455',
      address: {
        street: '789 Oak Rd',
        city: 'Chicago',
        state: 'IL',
        pincode: '60601'
      },
      totalOrders: 12,
      lastOrder: '2024-03-13'
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white border rounded-lg overflow-hidden shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {customer.email}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {customer.phone}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-start text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2 mt-1" />
                  <div>
                    <p>{customer.address.street}</p>
                    <p>{customer.address.city}, {customer.address.state} {customer.address.pincode}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-lg font-semibold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Order</p>
                    <p className="text-lg font-semibold text-gray-900">{customer.lastOrder}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;