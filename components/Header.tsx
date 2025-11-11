import React from 'react';
import { LogoIcon } from './icons';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-dark-800/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onHomeClick} className="flex items-center space-x-3 text-light-100 hover:text-secondary transition-colors duration-300">
            <LogoIcon className="w-8 h-8 text-secondary" />
            <span className="text-xl font-bold tracking-tight">Value Hub</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;