import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Plus, X, Search, UserCog, Shield, Mail, 
  Calendar, Edit, Trash2, Filter, ChevronDown 
} from "lucide-react";
import Loader from './Loader';

const UserManagement = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "Admin",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term and role
    let result = users;
    
    if (searchTerm) {
      result = result.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter(user => user.accountType === roleFilter);
    }

    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/auth/getAllUsers`, {
        headers: { Authorization: `${token}` },
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
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

  const renderAccountTypeTag = (type) => {
    const typeColors = {
      Admin: "bg-blue-100 text-blue-800",
      Graphics: "bg-green-100 text-green-800",
      Display: "bg-purple-100 text-purple-800",
      Accounts: "bg-yellow-100 text-yellow-800"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type] || 'bg-gray-100'}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and control user access across your organization
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" /> Add User
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none w-full border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Graphics">Graphics</option>
                <option value="Display">Display</option>
                <option value="Accounts">Accounts</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <UserCog className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderAccountTypeTag(user.accountType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[500px] max-w-full p-8 relative">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Graphics">Graphics</option>
                    <option value="Display">Display</option>
                    <option value="Accounts">Accounts</option>
                  </select>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Create Account
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

export default UserManagement;

// // UserManagement.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Plus, X, Search, UserCog, Shield, Mail, Calendar, Edit, Trash2 } from "lucide-react";

// const UserManagement = () => {
//   const BASE_URL = import.meta.env.VITE_BASE_URL;
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     accountType: "Admin",
//   });
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     if (!token) return;
//     try {
//       const response = await axios.get(`${BASE_URL}/api/v1/auth/getAllUsers`, {
//         headers: { Authorization: `${token}` },
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUsers(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     if (!token) return;
//     e.preventDefault();
//     try {
//       await axios.post(`${BASE_URL}/api/v1/auth/create-account`, formData, {
//         headers: { Authorization: `${token}` },
//         withCredentials: true,
//       });
//       setShowAddModal(false);
//       fetchUsers(); // Refresh the users list after adding a new user
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

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
//           <Plus className="h-5 w-5 mr-2" /> Add New User
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
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//           {users.map((user) => (
//             <div key={user._id} className="bg-white border rounded-lg p-6 shadow-sm">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                     <UserCog className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//                     <p className="text-sm text-gray-500">{user.accountType}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 space-y-3">
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Mail className="h-4 w-4 mr-2" />
//                   {user.email}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Calendar className="h-4 w-4 mr-2" />
//                   Created: {new Date(user.createdAt).toLocaleString()}
//                 </div>
//                 <div className="flex items-start text-sm text-gray-500">
//                   <Shield className="h-4 w-4 mr-2 mt-1" />
//                   <div>
//                     <p className="font-medium text-gray-700">Account Type:</p>
//                     <div className="mt-1">
//                       <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
//                         {user.accountType}
//                       </span>
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

//       {showAddModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <div className="flex justify-between">
//               <h2 className="text-xl font-semibold">Add New User</h2>
//               <button onClick={() => setShowAddModal(false)}>
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="mt-4">
//               <div className="mb-3">
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="block text-sm font-medium text-gray-700">Account Type</label>
//                 <select
//                   name="accountType"
//                   value={formData.accountType}
//                   onChange={handleChange}
//                   className="w-full border rounded-md p-2"
//                 >
//                   <option value="Accounts">Accounts</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Graphics">Graphics</option>
//                   <option value="Display">Display</option>
//                 </select>
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">
//                   Create Account
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;



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