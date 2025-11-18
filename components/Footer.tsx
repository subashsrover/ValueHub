
import React from 'react';

interface FooterProps {
    onContactClick: () => void;
    onTermsClick: () => void;
    onDisclaimerClick: () => void;
    onEULAClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick, onTermsClick, onDisclaimerClick, onEULAClick }) => {
  return (
    <footer className="bg-dark-800 mt-auto">
      <div className="container mx-auto px-6 py-6 text-light-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-sm text-light-200/70 order-2 sm:order-1">
                <button onClick={onTermsClick} className="hover:text-secondary transition-colors duration-300">
                    Terms & Conditions
                </button>
                <button onClick={onDisclaimerClick} className="hover:text-secondary transition-colors duration-300">
                    Disclaimer
                </button>
                <button onClick={onEULAClick} className="hover:text-secondary transition-colors duration-300">
                    EULA
                </button>
            </div>
            <div className="text-center text-sm order-1 sm:order-2">
                <p>&copy; {new Date().getFullYear()} Value Hub. All rights reserved.</p>
            </div>
            <div className="order-3">
                 <button onClick={onContactClick} className="text-light-100 hover:text-secondary transition-colors duration-300 font-semibold text-sm">
                    Contact Us
                </button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
