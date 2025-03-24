// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   UserPlus,
//   Contact2,
//   Image,
//   ListTodo,
//   DollarSign,
//   Settings,
//   LogOut,
//   ChevronDown,
//   ChevronUp,
//   Bell,
//   Inbox
// } from 'lucide-react';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('accountType') || '{}');
//   const [expandedSections, setExpandedSections] = useState({
//     analytics: false
//   });

//   const menuItems = {
//     SuperAdmin: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'User Management', icon: Users, path: '/user-management' },
//       { name: 'Orders', icon: FileText, path: '/orders' },
//       { name: 'Leads', icon: UserPlus, path: '/leads' },
//       { name: 'Customers', icon: Contact2, path: '/customers' },
//       { name: 'Gallery', icon: Image, path: '/gallery' },
//       { name: 'Work Queue', icon: ListTodo, path: '/work-queue' },
//       { name: 'Financial', icon: DollarSign, path: '/financial' },
//       { name: 'Settings', icon: Settings, path: '/settings' }
//     ],
//     Admin: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'Leads', icon: UserPlus, path: '/leads' },
//       { name: 'Users', icon: Users, path: '/users' },
//       { name: 'Orders', icon: FileText, path: '/orders' },
//       { name: 'Customers', icon: Contact2, path: '/customers' },
//       { name: 'Gallery', icon: Image, path: '/gallery' },
//       { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
//     ],
//     Graphics: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'Orders', icon: FileText, path: '/orders' },
//       { name: 'Gallery', icon: Image, path: '/gallery' }
//     ],
//     Display: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
//     ],
//     Accounts: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'Orders', icon: FileText, path: '/orders' },
//       { name: 'Accounts', icon: DollarSign, path: '/accounts' }
//     ]
//   };

//   const currentUserMenu = menuItems[userInfo] || [];
  
//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('accountType');
//     navigate('/login');
//   };

//   return (
//     <div className="w-64 bg-green-950 h-screen flex flex-col justify-between text-white">
//       {/* User profile section */}
//       <div>
//         <div className="p-4 flex items-center space-x-3">
//           <div className="bg-green-700 h-8 w-8 rounded-md flex items-center justify-center text-white font-semibold">
//             NS
//           </div>
//           <div className="flex-1">
//             <div className="text-sm font-medium">Nick Shchadov</div>
//             <div className="text-xs text-gray-400">My Podcast</div>
//           </div>
//           <button className="p-1 bg-green-700 rounded-md">
//             <span className="text-lg">+</span>
//           </button>
//         </div>
        
//         {/* Main navigation */}
//         <div className="mt-2 px-2">
//           <Link 
//             to="/inbox"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Inbox className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Inbox</span>
//           </Link>
          
//           <Link 
//             to="/alerts"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Bell className="h-5 w-5 mr-3 text-gray-400" />
//             <span className="flex-1">Alerts</span>
//             <span className="bg-red-500 text-xs font-medium px-1.5 rounded">2</span>
//           </Link>
          
//           <Link 
//             to="/overview"
//             className="flex items-center py-2 px-3 rounded-md bg-green-800"
//           >
//             <LayoutDashboard className="h-5 w-5 mr-3 text-white" />
//             <span>Overview</span>
//           </Link>
          
//           {/* Podcast section */}
//           <div className="mt-4 mb-2 text-xs font-semibold text-gray-400 px-3">Podcasts</div>
          
//           <Link 
//             to="/episodes"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <FileText className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Episodes</span>
//           </Link>
          
//           <Link 
//             to="/media"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Image className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Media</span>
//           </Link>
          
//           <Link 
//             to="/materials"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <FileText className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Materials</span>
//           </Link>
          
//           <Link 
//             to="/contacts"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Contact2 className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Contacts</span>
//           </Link>
          
//           {/* Analytics section */}
//           <div className="mt-4 mb-2 text-xs font-semibold text-gray-400 px-3">Analytics</div>
          
//           <Link 
//             to="/subscribers"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Users className="h-5 w-5 mr-3 text-gray-400" />
//             <span className="flex-1">Subscribers</span>
//             <span className="bg-green-800 text-xs font-medium px-1.5 rounded">24</span>
//           </Link>
          
//           <Link 
//             to="/channels"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Settings className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Channels</span>
//           </Link>
          
//           <Link 
//             to="/integrations"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <Settings className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Integrations</span>
//           </Link>
          
//           <Link 
//             to="/reports"
//             className="flex items-center py-2 px-3 rounded-md hover:bg-green-900"
//           >
//             <FileText className="h-5 w-5 mr-3 text-gray-400" />
//             <span>Reports</span>
//           </Link>
//         </div>
//       </div>
      
//       {/* Footer */}
//       <div className="p-3 border-t border-green-800">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="bg-gray-500 h-8 w-8 rounded-md flex items-center justify-center text-white font-semibold">
//               P
//             </div>
//             <div className="ml-2">
//               <div className="text-sm font-medium">PodCaster</div>
//             </div>
//           </div>
//           <div className="flex">
//             <button className="p-1 rounded text-gray-400 hover:text-white">···</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  UserPlus,
  Contact2,
  Image,
  ListTodo,
  DollarSign,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('accountType') || '{}');
  console.log(userInfo);

  const menuItems = {
    SuperAdmin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'User Management', icon: Users, path: '/user-management' },
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Leads', icon: UserPlus, path: '/leads' },
      { name: 'Customers', icon: Contact2, path: '/customers' },
      { name: 'Gallery', icon: Image, path: '/gallery' },
      { name: 'Work Queue', icon: ListTodo, path: '/work-queue' },
      { name: 'Financial', icon: DollarSign, path: '/financial' }
    ],
    Admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'Leads', icon: UserPlus, path: '/leads' },
      { name: 'Users', icon: Users, path: '/users' },
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Customers', icon: Contact2, path: '/customers' },
      { name: 'Gallery', icon: Image, path: '/gallery' },
      { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
    ],
    Graphics: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Gallery', icon: Image, path: '/gallery' }
    ],
    Display: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
    ],
    Accounts: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Accounts', icon: DollarSign, path: '/accounts' }
    ]
  };

  const currentUserMenu = menuItems[userInfo] || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountType');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-900 shadow-lg h-screen flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <h1 className="text-2xl font-bold text-indigo-400">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {currentUserMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-200' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center py-3 text-sm font-medium text-white rounded-lg hover:bg-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   UserPlus,
//   Contact2,
//   Image,
//   ListTodo,
//   DollarSign,
//   Settings,
//   LogOut
// } from 'lucide-react';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('accountType') || '{}');

//   const menuItems = {
//     SuperAdmin: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'User Management', icon: Users, path: '/user-management' },
//       { name: 'Orders', icon: FileText, path: '/orders' },
//       { name: 'Leads', icon: UserPlus, path: '/leads' },
//       { name: 'Customers', icon: Contact2, path: '/customers' },
//       { name: 'Gallery', icon: Image, path: '/gallery' },
//       { name: 'Work Queue', icon: ListTodo, path: '/work-queue' },
//       { name: 'Financial', icon: DollarSign, path: '/financial' },
//       { name: 'Settings', icon: Settings, path: '/settings' }
//     ],
//     Admin: [
//       { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
//       { name: 'Leads', icon: UserPlus, path: '/leads' },
//       { name: 'Users', icon: Users, path: '/users' },
//       { name: 'Orders', icon: FileText, path: '/orders' },
//       { name: 'Customers', icon: Contact2, path: '/customers' },
//       { name: 'Gallery', icon: Image, path: '/gallery' },
//       { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
//     ]
//   };

//   const currentUserMenu = menuItems[userInfo] || [];

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('accountType');
//     navigate('/login');
//   };

//   return (
//     <div className="w-64 bg-green-950 h-screen flex flex-col justify-between text-white">
//       <div>
//         <div className="h-16 flex items-center justify-center border-b border-gray-700">
//           <h1 className="text-xl font-bold text-green-400">Admin Panel</h1>
//         </div>
//         <nav className="mt-6">
//           <div className="px-4 space-y-2">
//             {currentUserMenu.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
//                     isActive ? 'bg-green-800 text-white' : 'text-gray-300 hover:bg-green-900 hover:text-white'
//                   }`}
//                 >
//                   <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-green-200' : 'text-gray-400'}`} />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>
//       </div>
//       <div className="p-4 border-t border-gray-700">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
//         >
//           <LogOut className="h-5 w-5 mr-2" /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;