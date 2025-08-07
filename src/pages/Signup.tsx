import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp, useClerk } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { X, User } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { client } = useClerk();
  const signUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intercept clicks on Clerk's signin links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if it's a link that contains sign-in
      if (target.tagName === 'A' && target.getAttribute('href')?.includes('sign-in')) {
        e.preventDefault();
        e.stopPropagation();
        navigate('/login');
        return false;
      }
      
      // Also check for any element with text content that includes "Sign in"
      if (target.textContent?.includes('Sign in') && target.closest('a')) {
        e.preventDefault();
        e.stopPropagation();
        navigate('/login');
        return false;
      }
    };

    // Add event listener to the Clerk component
    if (signUpRef.current) {
      signUpRef.current.addEventListener('click', handleClick, true);
    }

    // Also add a mutation observer to handle dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const signinLinks = element.querySelectorAll('a[href*="sign-in"]');
            signinLinks.forEach((link) => {
              link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/login');
              });
            });
          }
        });
      });
    });

    if (signUpRef.current) {
      observer.observe(signUpRef.current, { childList: true, subtree: true });
    }

    return () => {
      if (signUpRef.current) {
        signUpRef.current.removeEventListener('click', handleClick, true);
      }
      observer.disconnect();
    };
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      
      {/* Top right buttons */}
      <div className="absolute top-6 right-6 flex gap-3 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLoginClick}
          className="rounded-full px-4 py-2 bg-white shadow-lg border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-gray-700"
        >
          <User className="h-4 w-4 mr-2" />
          Log in
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full w-8 h-8 p-0 bg-white shadow-lg border-gray-300 text-gray-700 hover:bg-white hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Clerk SignUp Component */}
      <div className="w-full max-w-md" ref={signUpRef}>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl",
              headerTitle: "text-2xl font-semibold text-gray-800 text-center mb-8",
              headerSubtitle: "hidden",
              formButtonPrimary: "w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mb-6",
              formFieldInput: "h-11 bg-white text-gray-800 placeholder:text-gray-500",
              formFieldLabel: "text-sm font-medium text-gray-700",
              dividerLine: "bg-gray-300",
              dividerText: "text-gray-500 text-sm",
              socialButtonsBlockButton: "flex-1 h-11 bg-white border-gray-200 hover:bg-gray-50 rounded-lg",
              socialButtonsBlockButtonText: "text-gray-700 font-medium",
              footerActionLink: "text-blue-600 hover:text-blue-700",
            }
          }}
          afterSignUpUrl={window.location.origin + "/"}
          signInUrl={window.location.origin + "/login"}
        />
      </div>
    </div>
  );
};

export default Signup; 