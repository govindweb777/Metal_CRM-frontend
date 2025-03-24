// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from "./components/Auth/Login";
// import Signup from './components/Auth/SignUp';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import PrivateRoute from './components/PrivateRoute';
// import Dashboard from './components/pages/Dashboard';
// import Orders from './components/pages/Orders';


// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />   
//           <Route
//             path="/*"
//             element={
//               // <PrivateRoute>
//               <div className="min-h-screen flex">
//                 {/* Fixed sidebar on the left */}
//                 <Sidebar />
//                 <div className="fixed top-0 left-0 bottom-0 w-64 z-10">
//                 <Navbar />
//                 </div>
                
//                 {/* Main content area with navbar and routes */}
//                 <div className="flex flex-col ml-64 w-full">
//                   {/* Navbar at the top */}
//                   <div className="sticky top-0 z-10">
                  
//                   </div>
                  
//                   {/* Main content */}
//                   <main className="flex-grow p-4">
//                     <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/orders" element={<Orders />} />
//                     </Routes>
//                   </main>
//                 </div>
//               </div>
//               // </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from "./components/Auth/Login";
import Signup from './components/Auth/SignUp';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import PrivateRoute from './components/New folder/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Leads from './pages/Leads';
import Customers from './pages/Customers';
import Gallery from './pages/Gallery';
import WorkQueue from './pages/WorkQueue';
import UserManagement from './pages/UserManagement';
import Financial from './pages/Financial';
import Sidebar2 from './components/New folder/Sidebar';
import Settings from './pages/Settings';

function App() {
  return (

      <Router>
        <div className="min-h-screen bg-gray-100">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <div className="flex">
                    <div className="fixed h-screen">
                      <Sidebar2 />
                    </div>
                    <div className="flex-1 ml-64"> {/* Add margin equal to the width of your sidebar */}
                      <Navbar />
                      <main className="p-8">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/leads" element={<Leads/>} />
                          <Route path="/customers" element={<Customers />} />
                          <Route path="/gallery" element={<Gallery />} />
                          <Route path="/work-queue" element={<WorkQueue />} />
                          <Route path="/user-management" element={<UserManagement />} />
                          <Route path="/financial" element={<Financial />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
  );
}

export default App;