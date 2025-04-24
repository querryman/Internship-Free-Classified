import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import { Welcome } from '../pages/welcome/Welcome.tsx'; //../../pages/welcome/Welcome.tsx
import { Login } from '../pages/auth/Login.tsx';
import { Signup } from '../pages/auth/Signup.tsx';
import { Profile } from '../pages/auth/Profile.tsx';
import { Home } from '../pages/home/Home.tsx';
import { BuyList } from '../pages/buy/BuyList.tsx';
import { BuyDetails } from '../pages/buy/BuyDetails.tsx';
import { SellForm } from '../pages/sell/SellForm.tsx';
import { JobList } from '../pages/jobs/JobList.tsx';//../pages/jobs/JobList.tsx
import { JobDetails } from '../pages/jobs/JobDetails.tsx';
import { JobCreate } from '../pages/jobs/JobCreate.tsx';
import { JobApply } from '../pages/jobs/JobApply.tsx';
import { ServiceList } from '../pages/services/ServiceList.tsx';
import { ServiceDetails } from '../pages/services/ServiceDetails.tsx';
import { ServiceCreate } from '../pages/services/ServiceCreate.tsx';
import { ServiceRequest } from '../pages/services/ServiceRequest.tsx';
import { About } from '../pages/static/About.tsx';
import { Contact } from '../pages/static/Contact.tsx';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Semi-public routes (browsing) */}
      <Route path="/home" element={<Home />} />
      <Route path="/buy" element={<BuyList />} />
      <Route path="/buy/:category/:id" element={<BuyDetails />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/services/:id" element={<ServiceDetails />} />
      
      {/* Protected routes (require authentication) */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/sell" element={
        <ProtectedRoute>
          <SellForm />
        </ProtectedRoute>
      } />
      <Route path="/jobs/create" element={
        <ProtectedRoute>
          <JobCreate />
        </ProtectedRoute>
      } />
      <Route path="/jobs/:id/apply" element={
        <ProtectedRoute>
          <JobApply />
        </ProtectedRoute>
      } />
      <Route path="/services/create" element={
        <ProtectedRoute>
          <ServiceCreate />
        </ProtectedRoute>
      } />
      <Route path="/services/:id/request" element={
        <ProtectedRoute>
          <ServiceRequest />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};