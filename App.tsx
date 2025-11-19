
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ToolsPage from './components/ToolsPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import EnquirePage from './components/EnquirePage';
import TermsPage from './components/TermsPage';
import DisclaimerPage from './components/DisclaimerPage';
import EULAPage from './components/EULAPage';
import AdminDashboard from './components/AdminDashboard';
import ChatBot from './components/ChatBot';
import AnimatedBackground from './components/AnimatedBackground'; // Import
import type { Tool, User } from './types';
import { TOOLS } from './constants';
import { api } from './services/api';

type Page = 'home' | 'tools' | 'contact' | 'enquire' | 'terms' | 'disclaimer' | 'eula' | 'admin';
type Theme = 'dark' | 'light';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'dark'
  );

  useEffect(() => {
    // Check for session
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    // Load favorites for everyone
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
        const favoriteToolNames: string[] = JSON.parse(localStorage.getItem('favorite_tool_names') || '[]');
        const loadedFavorites = TOOLS.filter(tool => favoriteToolNames.includes(tool.name));
        setFavoriteTools(loadedFavorites);
    } catch (error) {
        console.error('Error parsing favorite tools:', error);
        setFavoriteTools([]);
    }
  };

  useEffect(() => {
    if (theme === 'light') {
        document.body.classList.remove('bg-dark-900', 'text-light-100');
        document.body.classList.add('bg-white', 'text-dark-900');
    } else {
        document.body.classList.remove('bg-white', 'text-dark-900');
        document.body.classList.add('bg-dark-900', 'text-light-100');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (page: Page) => {
    if (page === currentPage) return;
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsFadingOut(false);
    }, 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoginSuccess = () => {
    const currentUser = api.getCurrentUser();
    setUser(currentUser);
    setIsLoginModalOpen(false);
    // Favorites are already loaded, but we could reload if we merged backend favorites in a real app
    loadFavorites();
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    // We keep favorites locally even after logout in this implementation as they are localStorage based
    if (currentPage === 'admin') navigateTo('home');
  };

  const toggleFavoriteTool = (toolToToggle: Tool) => {
    setFavoriteTools(prevFavorites => {
        const isFavorite = prevFavorites.some(fav => fav.name === toolToToggle.name);
        let newFavorites;
        if (isFavorite) {
            newFavorites = prevFavorites.filter(fav => fav.name !== toolToToggle.name);
        } else {
            newFavorites = [...prevFavorites, toolToToggle];
        }
        // Persist
        const names = newFavorites.map(t => t.name);
        localStorage.setItem('favorite_tool_names', JSON.stringify(names));
        return newFavorites;
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans relative z-0">
      <AnimatedBackground /> {/* Add Background */}
      <Header 
        onHomeClick={() => navigateTo('home')}
        isLoggedIn={!!user}
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
        onAdminClick={() => navigateTo('admin')}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <main className={`flex-grow transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && <HomePage onExploreClick={() => navigateTo('tools')} />}
        {currentPage === 'tools' && <ToolsPage onBackClick={() => navigateTo('home')} onEnquireClick={() => navigateTo('enquire')} isLoggedIn={!!user} favoriteTools={favoriteTools} onToggleFavorite={toggleFavoriteTool} />}
        {currentPage === 'contact' && <ContactPage onBackClick={() => navigateTo('home')} />}
        {currentPage === 'enquire' && <EnquirePage onBackClick={() => navigateTo('tools')} />}
        {currentPage === 'terms' && <TermsPage onBackClick={() => navigateTo('home')} />}
        {currentPage === 'disclaimer' && <DisclaimerPage onBackClick={() => navigateTo('home')} />}
        {currentPage === 'eula' && <EULAPage onBackClick={() => navigateTo('home')} />}
        {currentPage === 'admin' && user?.role === 'admin' && <AdminDashboard onBackClick={() => navigateTo('home')} />}
      </main>
      <Footer 
        onContactClick={() => navigateTo('contact')}
        onTermsClick={() => navigateTo('terms')}
        onDisclaimerClick={() => navigateTo('disclaimer')}
        onEULAClick={() => navigateTo('eula')}
      />
      <ChatBot />
      {isLoginModalOpen && <LoginPage onLoginSuccess={handleLoginSuccess} onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
};

export default App;
