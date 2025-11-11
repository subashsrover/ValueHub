import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 mt-auto">
      <div className="container mx-auto px-6 py-6 text-center text-light-200">
        <p>&copy; {new Date().getFullYear()} Value Hub. All rights reserved.</p>
        <p className="text-sm text-dark-700">Your one-stop shop for premium tools and software.</p>
      </div>
    </footer>
  );
};

export default Footer;