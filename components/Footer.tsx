
import React from 'react';

interface FooterProps {
    onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="bg-dark-800 mt-auto">
      <div className="container mx-auto px-6 py-6 text-center text-light-200">
        <div className="mb-2">
            <button onClick={onContactClick} className="text-light-200 hover:text-secondary transition-colors duration-300">
                Contact Us
            </button>
        </div>
        <p>&copy; {new Date().getFullYear()} Value Hub. All rights reserved.</p>
        <p className="text-sm text-dark-700">Your one-stop shop for premium tools and software.</p>
      </div>
    </footer>
  );
};

export default Footer;