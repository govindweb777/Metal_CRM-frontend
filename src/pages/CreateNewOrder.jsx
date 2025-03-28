import React, { useState } from 'react';
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const CreateNewOrder = ({ onClose, addOrder }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        customer: "",
        dimensions: "",
        status: "New",
        assignedTo: "",
        image:[],
        imagePreview: null,
    });

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setOrder((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOrder((prev) => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("customer", order.customer);
        formData.append("dimensions", order.dimensions);
        formData.append("status", order.status);
        formData.append("assignedTo", order.assignedTo);
        if (order.image) {
            formData.append("image", order.image);
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized: No token found");
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/createOrder`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create order: ${errorText}`);
            }

            const result = await response.json();
            console.log("Order Created:", result);
    
            if (onClose) onClose();
            //navigate("/orders");
            window.location.reload();

        } catch (error) {
            console.error("Error creating order:", error);
            alert(`Something went wrong: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/getUsers`, {
            method: "GET",
            headers: { Authorization: `${token}` },
          });
    
          if (!response.ok) throw new Error("Failed to fetch users");
          const data = await response.json();
    
          const designers = data.users.filter(user => user.accountType === "Graphics Designer");
          setUsers(designers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
    };
     
    const handleSelectUser = (selectedUser) => {
        setOrder((prev) => ({
          ...prev,
          assignedTo: selectedUser.name,
        }));
        setFilteredUsers([]);
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
                        name="customer"
                        placeholder="Customer Name"
                        value={order.customer}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="dimensions"
                        placeholder="Dimensions"
                        value={order.dimensions}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <select
                        name="status"
                        value={order.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
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
                        className="w-full p-2 border rounded-md"
                        required
                    />
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
                            className="w-full h-32 object-cover rounded-md"
                        />
                    )}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <Loader />
                                    <span className="ml-2">Creating...</span>
                                </div>
                            ) : (
                                'Create Order'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewOrder;
