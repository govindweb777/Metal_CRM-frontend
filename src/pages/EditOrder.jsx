import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from './Loader';

const EditOrder = () => {
  const { id } = useParams(); // Get order ID from URL
  console.log(id,"yhhhhnjhjj")
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    customerName: "",
    dimensions: "",
    status: "",
    assignedTo: "",
  });

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/v1/admin/getOrderById/${id}`, {
        method: "GET",
        headers: { Authorization: `${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch order");
      
      const data = await response.json();
      setOrder(data.order);
      setFormData({
        customerName: data.order.customerName,
        dimensions: data.order.dimensions,
        status: data.order.status,
        assignedTo: data.order.assignedTo,
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/v1/admin/updateOrder/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update order");

      alert("Order updated successfully!");
      navigate("/orders"); // Redirect to orders page
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Order</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensions</label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="New">New</option>
            <option value="InProgress">In Progress</option>
            <option value="PendingApproval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Billed">Billed</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Loader from './Loader';

// const EditOrderPopup = ({ onClose }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const BASE_URL = import.meta.env.VITE_BASE_URL;
//   const [formData, setFormData] = useState({
//     customerName: "",
//     dimensions: "",
//     status: "",
//     assignedTo: "",
//   });

//   useEffect(() => {
//     fetchOrderDetails();
//   }, []);

//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/v1/admin/getOrderById/${id}`, {
//         method: "GET",
//         headers: { Authorization: `${token}` },
//       });

//       if (!response.ok) throw new Error("Failed to fetch order");
      
//       const data = await response.json();
//       setOrder(data.order);
//       setFormData({
//         customerName: data.order.customerName,
//         dimensions: data.order.dimensions,
//         status: data.order.status,
//         assignedTo: data.order.assignedTo,
//       });
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/v1/admin/updateOrder/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Failed to update order");

//       alert("Order updated successfully!");
//       onClose(); // Close the popup instead of navigating
//     } catch (error) {
//       console.error("Error updating order:", error);
//       alert("Failed to update order");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <Loader />
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-xl">Order not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
//         <h1 className="text-xl font-semibold mb-4">Edit Order</h1>
//         <form onSubmit={handleUpdate} className="space-y-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
//             <input
//               type="text"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleChange}
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Dimensions</label>
//             <input
//               type="text"
//               name="dimensions"
//               value={formData.dimensions}
//               onChange={handleChange}
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
//             >
//               <option value="New">New</option>
//               <option value="InProgress">In Progress</option>
//               <option value="PendingApproval">Pending Approval</option>
//               <option value="Approved">Approved</option>
//               <option value="Completed">Completed</option>
//               <option value="Billed">Billed</option>
//               <option value="Paid">Paid</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Assigned To</label>
//             <input
//               type="text"
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
//             />
//           </div>
//           <div className="flex justify-end space-x-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-3 py-1.5 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs hover:bg-indigo-700"
//             >
//               Update Order
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditOrderPopup;