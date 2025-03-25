// UserManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X, Search, UserCog, Shield, Mail, Calendar, Edit, Trash2 } from "lucide-react";

const UserManagement = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "Admin",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/getAllUsers`, {
        headers: { Authorization: `${token}` },
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!token) return;
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/v1/auth/create-account`, formData, {
        headers: { Authorization: `${token}` },
        withCredentials: true,
      });
      setShowAddModal(false);
      fetchUsers(); // Refresh the users list after adding a new user
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage user roles, permissions, and access</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Add New User
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Graphics">Graphics</option>
              <option value="Display">Display</option>
              <option value="Accounts">Accounts</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {users.map((user) => (
            <div key={user._id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <UserCog className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.accountType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created: {new Date(user.createdAt).toLocaleString()}
                </div>
                <div className="flex items-start text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">Account Type:</p>
                    <div className="mt-1">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {user.accountType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="Accounts">Accounts</option>
                  <option value="Admin">Admin</option>
                  <option value="Graphics">Graphics</option>
                  <option value="Display">Display</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end">
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;



// import React, { useState } from 'react';
// import { Plus, Search, UserCog, Shield, Mail, Calendar, Edit, Trash2 } from 'lucide-react';

// const UserManagement = () => {
//   const [showAddModal, setShowAddModal] = useState(false);

//   const users = [
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'Admin',
//       permissions: ['Users', 'Orders', 'Customers'],
//       lastActive: '2024-03-15 14:30',
//       status: 'Active'
//     },
//     {
//       id: 2,
//       name: 'Sarah Smith',
//       email: 'sarah@example.com',
//       role: 'Graphics',
//       permissions: ['Gallery', 'Orders'],
//       lastActive: '2024-03-15 12:45',
//       status: 'Active'
//     },
//     {
//       id: 3,
//       name: 'Mike Johnson',
//       email: 'mike@example.com',
//       role: 'Display',
//       permissions: ['Work Queue'],
//       lastActive: '2024-03-14 16:20',
//       status: 'Inactive'
//     }
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
//           <p className="mt-1 text-sm text-gray-500">Manage user roles, permissions, and access</p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Add New User
//         </button>
//       </div>

//       <div className="bg-white shadow rounded-lg">
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//               <option value="">All Roles</option>
//               <option value="Admin">Admin</option>
//               <option value="Graphics">Graphics</option>
//               <option value="Display">Display</option>
//               <option value="Accounts">Accounts</option>
//             </select>
//             <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//               <option value="">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//           {users.map((user) => (
//             <div key={user.id} className="bg-white border rounded-lg p-6 shadow-sm">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                     <UserCog className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//                     <p className="text-sm text-gray-500">{user.role}</p>
//                   </div>
//                 </div>
//                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                   user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {user.status}
//                 </span>
//               </div>

//               <div className="mt-4 space-y-3">
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Mail className="h-4 w-4 mr-2" />
//                   {user.email}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Calendar className="h-4 w-4 mr-2" />
//                   Last active: {user.lastActive}
//                 </div>
//                 <div className="flex items-start text-sm text-gray-500">
//                   <Shield className="h-4 w-4 mr-2 mt-1" />
//                   <div>
//                     <p className="font-medium text-gray-700">Permissions:</p>
//                     <div className="mt-1 flex flex-wrap gap-2">
//                       {user.permissions.map((permission, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-gray-100 rounded-full text-xs"
//                         >
//                           {permission}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end space-x-3">
//                 <button className="text-blue-600 hover:text-blue-900">
//                   <Edit className="h-5 w-5" />
//                 </button>
//                 <button className="text-red-600 hover:text-red-900">
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;