import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Show the landing page for both authenticated and unauthenticated users
  return <Dashboard />;
};

export default Index;
