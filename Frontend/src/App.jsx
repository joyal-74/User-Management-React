import React from "react"
import Signup from './Pages/Login/Signup'
import LoginUser from './Pages/Login/Login'
import UserProfile from "./Pages/Profile/Profile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginAdmin from "./Pages/Admin/Login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AdminLayout from "./Pages/Layout/AdminLayout";
import UserLayout from "./Pages/Layout/UserLayout";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";


function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} 
            closeOnClick pauseOnHover draggable theme="dark" />

             <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/admin/login" element={<LoginAdmin />} />

                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<UserProfile />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
