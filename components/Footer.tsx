'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onContactClick?: () => void;
  onTermsClick?: () => void;
  onDisclaimerClick?: () => void;
  onEULAClick?: () => void;
}

const Footer: React.FC<FooterProps> = (props) => {
  const handleLinkClick = (callback?: () => void) => (e: React.MouseEvent) => {
    if (callback) {
      e.preventDefault();
      callback();
    }
  };

  return (
    <footer className="bg-dark-800 mt-auto">
      <div className="container mx-auto px-6 py-6 text-light-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-sm text-light-200/70 order-2 sm:order-1">
                <Link href="/terms" onClick={handleLinkClick(props.onTermsClick)} className="hover:text-secondary transition-colors duration-300">
                    Terms & Conditions
                </Link>
                <Link href="/disclaimer" onClick={handleLinkClick(props.onDisclaimerClick)} className="hover:text-secondary transition-colors duration-300">
                    Disclaimer
                </Link>
                <Link href="/eula" onClick={handleLinkClick(props.onEULAClick)} className="hover:text-secondary transition-colors duration-300">
                    EULA
                </Link>
            </div>
            <div className="text-center text-sm order-1 sm:order-2">
                <p>&copy; {new Date().getFullYear()} Value Hub. All rights reserved.</p>
            </div>
            <div className="order-3">
                 <Link href="/contact" onClick={handleLinkClick(props.onContactClick)} className="text-light-100 hover:text-secondary transition-colors duration-300 font-semibold text-sm">
                    Contact Us
                </Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;