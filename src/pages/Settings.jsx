import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    accountType: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/auth/getUserDetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch user details");
      }
    };
    fetchUser();
  }, [token]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/v1/auth/changePassword`,
        { email: user.email, oldPassword: currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-black">
      {/* Profile Information Section */}
      <div className="bg-gray-300 rounded-lg p-6">
        <h2 className="text-[#5A6ACF] text-xl font-semibold mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black mb-2">Full Name</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full p-3 bg-white text-black rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-3 bg-white text-black rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-black mb-2">Account Type</label>
            <input
              type="text"
              value={user.accountType}
              disabled
              className="w-full p-3 bg-white text-black rounded-md border border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
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
