import React from 'react';
import { Button } from './button';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

export const Navigation = () => {
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
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm">
            Sign up
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};