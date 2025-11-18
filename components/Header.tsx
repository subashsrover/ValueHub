'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, useTheme } from './Providers';
import { LogoIcon, SunIcon, MoonIcon, SparklesIcon } from './icons';
import type { User } from '../types';

interface HeaderProps {
  onHomeClick?: () => void;
  isLoggedIn?: boolean;
  user?: User | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => Promise<void> | void;
  onAdminClick?: () => void;
  onUpgradeClick?: () => void;
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const authContext = useAuth();
  const themeContext = useTheme();

  // Use props if provided (legacy App.tsx mode), otherwise fallback to Context (Next.js mode)
  const user = props.user !== undefined ? props.user : authContext.user;
  const logout = props.onLogoutClick || authContext.logout;
  const openLoginModal = props.onLoginClick || authContext.openLoginModal;
  const openPaymentModal = props.onUpgradeClick || authContext.openPaymentModal;

  const theme = props.theme !== undefined ? props.theme : themeContext.theme;
  const toggleTheme = props.onThemeToggle || themeContext.toggleTheme;

  const isLoggedIn = props.isLoggedIn !== undefined ? props.isLoggedIn : !!user;

  const handleHomeClick = (e: React.MouseEvent) => {
    if (props.onHomeClick) {
      e.preventDefault();
      props.onHomeClick();
    }
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    if (props.onAdminClick) {
      e.preventDefault();
      props.onAdminClick();
    }
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-dark-800/80' : 'bg-light-100/80 border-b border-light-200'} backdrop-blur-sm sticky top-0 z-50`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={handleHomeClick} className="flex items-center space-x-3 hover:text-secondary transition-colors duration-300">
            <LogoIcon className="w-8 h-8 text-secondary" />
            <span className="text-xl font-bold tracking-tight">Value Hub</span>
          </Link>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
             <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`p-2 rounded-full transition-colors duration-300 ${
                    theme === 'dark'
                    ? 'text-yellow-400 hover:bg-dark-700'
                    : 'text-primary hover:bg-light-200'
                }`}
            >
                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {/* Subscription Upsell */}
            {(!isLoggedIn || (user && user.plan === 'Free')) && (
                <button 
                    onClick={isLoggedIn ? openPaymentModal : openLoginModal}
                    className="hidden sm:flex items-center gap-2 text-accent hover:text-orange-400 font-bold text-sm transition-colors"
                >
                    <SparklesIcon className="w-4 h-4" />
                    <span>Upgrade to Pro</span>
                </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                  {user?.role === 'admin' && (
                      <Link 
                        href="/admin"
                        onClick={handleAdminClick}
                        className="text-light-200 hover:text-white font-medium text-sm"
                      >
                        Admin
                      </Link>
                  )}
                  <div className="flex items-center gap-3">
                      <span className="hidden md:block text-sm font-medium text-light-200">
                          {user?.name}
                          {user?.plan === 'Pro' && <span className="ml-2 text-[10px] bg-secondary px-1.5 py-0.5 rounded text-white">PRO</span>}
                      </span>
                      <button 
                        onClick={() => logout && logout()}
                        className="bg-dark-700 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-red-500/80 transition-all duration-300"
                      >
                        Sign Out
                      </button>
                  </div>
              </div>
            ) : (
              <button 
                onClick={() => openLoginModal && openLoginModal()}
                className="bg-secondary text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-blue-500 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;