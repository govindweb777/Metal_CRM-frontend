import React, { useState } from 'react';
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CreateNewOrder = ({ onClose, addOrder}) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
      customer: "",
      dimensions: "",
      status: "New",
      assignedTo: "",
      image: null,
      imagePreview: null,
    });
  
    const handleChange = (e) => {
      setOrder({ ...order, [e.target.name]: e.target.value });
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setOrder((prev) => ({ ...prev, image: file, imagePreview: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!order.Id.trim()) {
          alert("Order ID is required!");
          return;
        }
      
        try {
          const newOrder = {
            id: order.Id,
            customer: order.customer,
            dimensions: order.dimensions,
            status: order.status,
            assignedTo: order.assignedTo,
            createdAt: new Date().toISOString().split("T")[0],
            image: order.imagePreview || "https://th.bing.com/th/id/OIP.IALGHl53C9zV4TJ1feq-cwHaFN?w=214&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7", // Default image
          };
      
          addOrder(newOrder); // Now passing a regular object, not FormData
          onClose();
          navigate("/orders");
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Something went wrong!");
        }
      };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Order</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Id"
            placeholder="Order ID"
            value={order.Id}
            onChange={handleChange}
            className="w-full p-2 border rounded-md  "
            required
          />

          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={order.customer}
            onChange={handleChange}
            className="w-full p-2 border rounded-md "
            required
          />

          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions (e.g. 100x150cm)"
            value={order.dimensions}
            onChange={handleChange}
            className="w-full p-2 border rounded-md "
            required
          />

          <select
            name="status"
            value={order.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md "
          >
            <option value="New">New</option>
            <option value="InProgress">In Progress</option>
            <option value="PendingApproval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Billed">Billed</option>
            <option value="Paid">Paid</option>
          </select>

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={order.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border rounded-md "
          />

          <label className="block text-gray-700 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />

          {order.imagePreview && (
            <img
              src={order.imagePreview}
              alt="Preview"
              className="w-full h-32 object-cover mt-2 rounded-md"
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Save Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewOrder;
