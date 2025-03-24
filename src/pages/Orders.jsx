import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

const Orders = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const orders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      dimensions: '100x150cm',
      status: 'New',
      assignedTo: 'Sarah Designer',
      createdAt: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      dimensions: '200x300cm',
      status: 'InProgress',
      assignedTo: 'Mike Artist',
      createdAt: '2024-03-14',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      dimensions: '150x200cm',
      status: 'Completed',
      assignedTo: 'Lisa Graphics',
      createdAt: '2024-03-13',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop&q=60'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-yellow-100 text-yellow-800';
      case 'InProgress':
        return 'bg-blue-100 text-blue-800';
      case 'PendingApproval':
        return 'bg-orange-100 text-orange-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      case 'Billed':
        return 'bg-indigo-100 text-indigo-800';
      case 'Paid':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Order
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="InProgress">In Progress</option>
              <option value="PendingApproval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Billed">Billed</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={order.image}
                  alt={`Order ${order.id}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                  <p className="text-sm text-gray-600">Dimensions: {order.dimensions}</p>
                  <p className="text-sm text-gray-600">Assigned to: {order.assignedTo}</p>
                  <p className="text-sm text-gray-600">Created: {order.createdAt}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;