import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Button } from './button';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

export const Navigation = () => {
  const navigate = useNavigate();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-semibold">Twain</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                Log in
              </Button>
              <Button size="sm" onClick={handleSignupClick}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};