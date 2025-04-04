import React, { useEffect, useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import CreateNewOrder from "./CreateNewOrder";
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

const Orders = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/v1/admin/getOrders`, {
        method: "GET",
        headers: { Authorization: `${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/v1/admin/updateOrder/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

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

  const filteredOrders = orders.filter(order => 
    ((order.customer?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
     (order.id?.includes(searchQuery))) &&
    (filterStatus === "" || order.status === filterStatus)
  );
  console.log("this is orders",filteredOrders);
  const deleteOrder = async (orders) => {
    const orderId = orders._id
    if(!window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      return;
    }
      console.log(orders);
    // Optimistically update the UI
    setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orders.orderId));
  
    try {
      const token = localStorage.getItem("token");
  
        const response = await fetch(`${BASE_URL}/api/v1/admin/deleteOrder/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete order`);
      }
  
      console.log(`Order ${orderId} deleted successfully`);
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
  
      // **Rollback UI if deletion fails**
      fetchOrders(); // Re-fetch orders from the backend
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select 
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={order.image ? order.image : 'https://images.unsplash.com/photo-1742732370413-063ed597e8f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8'}
                    alt={`Order ${order?.id || 'No ID'}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{order.orderId}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Customer: {order.customerName?order.customerName:"unknown"}</p>
                    <p className="text-sm text-gray-600">Dimensions: {order.dimensions}</p>
                    <p className="text-sm text-gray-600">Assigned to: {order.assignedTo}</p>
                    <p className="text-sm text-gray-600">Created: {order.created}</p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button 
                       className="text-green-600 hover:text-green-900"
                       onClick={() => navigate(`/edit-order/${order._id}`)}
                    >
                       <Edit className="h-5 w-5" />
                    </button>;
              
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deleteOrder(order)} 
                    >
                     <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showAddModal && <CreateNewOrder onClose={() => setShowAddModal(false)}  addOrder={addOrder}  />}
    </div>
  );
};

export default Orders;

