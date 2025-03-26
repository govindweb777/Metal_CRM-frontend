import React, { useState } from 'react';
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CreateNewOrder = ({ onClose, addOrder }) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        customer: "",
        dimensions: "",
        status: "New",  // Set default status to "New"
        assignedTo: "",
        image:[],
        imagePreview: null,
    });

    // const handleChange = (e) => {
    //     // console.log(`Field: ${e.target.name}, Value: ${e.target.value}`); 
    //     setOrder({ ...order, [e.target.name]: e.target.value });
    // };

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

        console.log("Final Order Before Submit:", order); // Debugging

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

            const response = await fetch("http://localhost:3000/api/v1/admin/createOrder", {
                method: "POST",
                headers: {
                    Authorization: `${token}`, // Fix template literal
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create order: ${errorText}`);
            }

            const result = await response.json();
            console.log("Order Created:", result);

            // const newOrder = {
            //     customer: result.order.customer || "Unknown",
            //     dimensions: result.order.dimensions || "Not specified",
            //     status: result.order.status || "New",
            //     assignedTo: result.order.assignedTo || "Unassigned",
            //     createdAt: result.order.createdAt || new Date().toISOString().split('T')[0],
            //     image: result.order.image ? [result.order.image] : [],
            // };

            if (onClose) onClose();
            navigate("/orders");

        } catch (error) {
            console.error("Error creating order:", error);
            alert(`Something went wrong: ${error.message}`);
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
                        placeholder="Dimensions (e.g. 100x150cm)"
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
                        {["New", "InProgress", "PendingApproval", "Approved", "Completed", "Billed", "Paid"].map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="assignedTo"
                        placeholder="Assigned To"
                        value={order.assignedTo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
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
