
'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      {/* Dark Mode Blobs */}
      <div className="absolute top-0 left-0 w-full h-full bg-dark-900 opacity-90 hidden dark:block"></div>
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:mix-blend-screen dark:bg-purple-900/40"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:mix-blend-screen dark:bg-blue-900/40"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:mix-blend-screen dark:bg-pink-900/40"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
    </div>
  );
};

export default AnimatedBackground;
