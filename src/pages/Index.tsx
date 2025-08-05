import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If user is signed in, redirect to campaign page
  if (isSignedIn) {
    return <Navigate to="/create-campaign" replace />;
  }

  // If user is not signed in, show the landing page
  return <Dashboard />;
};

export default Index;
