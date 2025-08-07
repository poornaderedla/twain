import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Button } from './button';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

interface NavigationProps {
  activeNavItem?: string;
  setActiveNavItem?: (item: string) => void;
}

export const Navigation = ({ activeNavItem = 'dashboard', setActiveNavItem }: NavigationProps) => {
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
    // Don't navigate - let the user stay on the current page
    // The navbar will automatically show login/signup buttons after sign out
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
            <button 
              onClick={() => setActiveNavItem?.('features')}
              className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeNavItem === 'features' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Features
            </button>
            <button 
              onClick={() => setActiveNavItem?.('resources')}
              className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeNavItem === 'resources' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Resources
            </button>
            <button 
              onClick={() => setActiveNavItem?.('pricing')}
              className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeNavItem === 'pricing' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </button>
            <button 
              onClick={() => setActiveNavItem?.('dashboard')}
              className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeNavItem === 'dashboard' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </button>
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