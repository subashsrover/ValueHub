
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ToolsPage from './components/ToolsPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

type Page = 'login' | 'home' | 'tools';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const navigateTo = (page: Page) => {
    if (page === currentPage) return;
    
    // No fade for initial login -> home transition
    if (currentPage === 'login') {
      setCurrentPage(page);
      return;
    }

    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsFadingOut(false);
    }, 300); // Match duration of fade-out animation
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-dark-900 font-sans">
      {currentPage === 'login' ? (
        <LoginPage onLoginSuccess={() => navigateTo('home')} />
      ) : (
        <>
          <Header onHomeClick={() => navigateTo('home')} />
          <main className={`flex-grow transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
            {currentPage === 'home' && <HomePage onExploreClick={() => navigateTo('tools')} />}
            {currentPage === 'tools' && <ToolsPage onBackClick={() => navigateTo('home')} />}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
