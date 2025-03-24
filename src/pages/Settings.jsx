import React, { useEffect, useState } from "react";
import { ConstructionIcon, Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/auth/getUser`, {
          headers: { Authorization: `${token}` }, // Fixed header format
        });
        console.log("response", response.data);
        setUser(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch user details");
      }
    };

    fetchUser();
  }, [token]);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.post(
        `${BASE_URL}/api/v1/auth/change-password`,
        { email: user.email, oldPassword: currentPassword, newPassword },
        { headers: { Authorization: `${token}` } }
      );

      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  if (!user) {
    return <p className="text-center text-gray-600">Loading user data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-black">
      {console.log("user iiii", user)}
      {/* Profile Information Section */}
      <div className="bg-gray-300 rounded-lg p-6">
        <h2 className="text-[#5A6ACF] text-xl font-semibold mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black mb-2">Full Name</label>
            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="w-full p-3 bg-white text-black rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full p-3 bg-white text-black rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-black mb-2">Account Type</label>
            <input
              type="text"
              value={user?.accountType || ""}
              disabled
              className="w-full p-3 bg-white text-black rounded-md border border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <form onSubmit={handlePasswordChange} className="bg-gray-300 rounded-lg p-6">
        <h2 className="text-[#5A6ACF] text-xl font-semibold mb-6">Change Password</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-black mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-md border border-gray-700 pr-10"
                placeholder="Enter Current Password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-black mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-md border border-gray-700 pr-10"
                placeholder="Enter New Password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button type="submit" className="px-6 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
