
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import type { User, Tool } from '../types';
import { TOOLS } from '../constants';
import LoginPage from './LoginPage';

// --- Safe Defaults ---
const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  refreshUser: () => {},
  openLoginModal: () => {},
};

const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
};

const defaultFavoritesContext: FavoritesContextType = {
  favoriteTools: [],
  toggleFavorite: () => {},
};

const defaultPriceAlertsContext: PriceAlertsContextType = {
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {},
  getAlert: () => undefined,
  notifications: [],
  dismissNotification: () => {},
};

const defaultHistoryContext: HistoryContextType = {
  recentlyViewed: [],
  addToHistory: () => {},
  clearHistory: () => {},
};

const defaultRatingsContext: RatingsContextType = {
  userRatings: {},
  getToolStats: () => ({ average: 0, count: 0 }),
  rateTool: () => {},
};

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
  openLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// --- Theme Context ---
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

// --- Favorites Context ---
interface FavoritesContextType {
  favoriteTools: Tool[];
  toggleFavorite: (tool: Tool) => void;
}

const FavoritesContext = createContext<FavoritesContextType>(defaultFavoritesContext);

// --- Price Alerts Context ---
interface PriceAlert {
  toolName: string;
  targetPrice: number;
}

interface PriceAlertsContextType {
  alerts: PriceAlert[];
  addAlert: (toolName: string, targetPrice: number) => void;
  removeAlert: (toolName: string) => void;
  getAlert: (toolName: string) => number | undefined;
  notifications: string[];
  dismissNotification: (index: number) => void;
}

const PriceAlertsContext = createContext<PriceAlertsContextType>(defaultPriceAlertsContext);

// --- History Context ---
interface HistoryContextType {
  recentlyViewed: Tool[];
  addToHistory: (tool: Tool) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType>(defaultHistoryContext);

// --- Ratings Context ---
interface RatingStats {
  average: number;
  count: number;
}

interface RatingsContextType {
  userRatings: Record<string, number>;
  getToolStats: (toolName: string) => RatingStats;
  rateTool: (toolName: string, rating: number) => void;
}

const RatingsContext = createContext<RatingsContextType>(defaultRatingsContext);

export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
export const useFavorites = () => useContext(FavoritesContext);
export const usePriceAlerts = () => useContext(PriceAlertsContext);
export const useHistory = () => useContext(HistoryContext);
export const useRatings = () => useContext(RatingsContext);

export function Providers({ children }: { children: React.ReactNode }) {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Favorites State
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);

  // Price Alerts State
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  // History State
  const [recentlyViewed, setRecentlyViewed] = useState<Tool[]>([]);

  // Ratings State
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [toolStats, setToolStats] = useState<Record<string, RatingStats>>({});

  // --- Effects ---

  useEffect(() => {
    // Init User
    const currentUser = api.getCurrentUser();
    if (currentUser) setUser(currentUser);

    // Init Theme
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    // Init Favorites
    try {
      const favoriteToolNames: string[] = JSON.parse(localStorage.getItem('favorite_tool_names') || '[]');
      const loadedFavorites = TOOLS.filter(tool => favoriteToolNames.includes(tool.name));
      setFavoriteTools(loadedFavorites);
    } catch (error) {
      setFavoriteTools([]);
    }

    // Init Alerts
    try {
        const savedAlerts = JSON.parse(localStorage.getItem('price_alerts') || '[]');
        setAlerts(savedAlerts);
        checkAlerts(savedAlerts);
    } catch (error) {
        setAlerts([]);
    }

    // Init History
    try {
      const historyNames: string[] = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      // Map names back to current Tool objects to ensure data is fresh and valid
      const historyTools = historyNames
        .map(name => TOOLS.find(t => t.name === name))
        .filter((t): t is Tool => t !== undefined);
      setRecentlyViewed(historyTools);
    } catch (error) {
      console.error("Failed to load history", error);
      setRecentlyViewed([]);
    }

    // Init Ratings
    try {
        const savedUserRatings = JSON.parse(localStorage.getItem('user_ratings') || '{}');
        setUserRatings(savedUserRatings);

        const savedStats = JSON.parse(localStorage.getItem('tool_stats') || '{}');
        const initialStats: Record<string, RatingStats> = {};
        
        // Initialize stats for all tools, using mock data if no saved data exists
        TOOLS.forEach(tool => {
            if (savedStats[tool.name]) {
                initialStats[tool.name] = savedStats[tool.name];
            } else {
                // Generate deterministic random stats for a populated look
                let hash = 0;
                for (let i = 0; i < tool.name.length; i++) {
                    hash = tool.name.charCodeAt(i) + ((hash << 5) - hash);
                }
                const random = (Math.abs(hash) % 100) / 100; // 0 to 1
                const average = 4.2 + (random * 0.8); // 4.2 to 5.0
                const count = Math.floor(20 + random * 200); // 20 to 220
                initialStats[tool.name] = { average: parseFloat(average.toFixed(1)), count };
            }
        });
        setToolStats(initialStats);
    } catch (e) { console.error("Failed to load ratings", e); }

  }, []);

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

  // --- Handlers ---

  const login = async (email: string) => {
    const loggedInUser = await api.login(email);
    setUser(loggedInUser);
    setIsLoginModalOpen(false);
    refreshFavorites();
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setFavoriteTools([]);
    setAlerts([]);
    setUserRatings({});
  };

  const refreshUser = () => {
    const currentUser = api.getCurrentUser();
    setUser(currentUser);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const refreshFavorites = () => {
     try {
        const favoriteToolNames: string[] = JSON.parse(localStorage.getItem('favorite_tool_names') || '[]');
        const loadedFavorites = TOOLS.filter(tool => favoriteToolNames.includes(tool.name));
        setFavoriteTools(loadedFavorites);
    } catch (e) { setFavoriteTools([]); }
  };

  const toggleFavorite = (toolToToggle: Tool) => {
    setFavoriteTools(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.name === toolToToggle.name);
      let newFavorites;
      if (isFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.name !== toolToToggle.name);
      } else {
        newFavorites = [...prevFavorites, toolToToggle];
      }
      const names = newFavorites.map(t => t.name);
      localStorage.setItem('favorite_tool_names', JSON.stringify(names));
      return newFavorites;
    });
  };

  // Alert Handlers
  const addAlert = (toolName: string, targetPrice: number) => {
      const newAlerts = [...alerts.filter(a => a.toolName !== toolName), { toolName, targetPrice }];
      setAlerts(newAlerts);
      localStorage.setItem('price_alerts', JSON.stringify(newAlerts));
      checkAlerts(newAlerts);
  };

  const removeAlert = (toolName: string) => {
      const newAlerts = alerts.filter(a => a.toolName !== toolName);
      setAlerts(newAlerts);
      localStorage.setItem('price_alerts', JSON.stringify(newAlerts));
  };

  const getAlert = (toolName: string) => {
      return alerts.find(a => a.toolName === toolName)?.targetPrice;
  };

  const checkAlerts = (currentAlerts: PriceAlert[]) => {
      const newNotifications: string[] = [];
      currentAlerts.forEach(alert => {
          const tool = TOOLS.find(t => t.name === alert.toolName);
          if (tool && tool.offerPrice != null && tool.offerPrice <= alert.targetPrice) {
              newNotifications.push(`Good news! ${tool.name} is now available for $${tool.offerPrice} (Target: $${alert.targetPrice})`);
          }
      });
      setNotifications(prev => {
          const unique = Array.from(new Set([...prev, ...newNotifications]));
          return unique;
      });
  };

  const dismissNotification = (index: number) => {
      setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  // History Handlers
  const addToHistory = (tool: Tool) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(t => t.name !== tool.name);
      const newHistory = [tool, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('recently_viewed', JSON.stringify(newHistory.map(t => t.name)));
      } catch (e) { console.error(e); }
      return newHistory;
    });
  };

  const clearHistory = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recently_viewed');
  };

  // Rating Handlers
  const rateTool = (toolName: string, rating: number) => {
      setUserRatings(prev => {
          const next = { ...prev, [toolName]: rating };
          localStorage.setItem('user_ratings', JSON.stringify(next));
          return next;
      });

      setToolStats(prev => {
          const currentStat = prev[toolName] || { average: 0, count: 0 };
          const oldUserRating = userRatings[toolName];
          
          let newTotal = currentStat.average * currentStat.count;
          let newCount = currentStat.count;

          if (oldUserRating) {
              // Update existing rating
              newTotal = newTotal - oldUserRating + rating;
          } else {
              // New rating
              newTotal = newTotal + rating;
              newCount += 1;
          }
          
          // Avoid division by zero
          const newAverage = newCount > 0 ? parseFloat((newTotal / newCount).toFixed(1)) : 0;
          
          const nextStats = { ...prev, [toolName]: { average: newAverage, count: newCount } };
          localStorage.setItem('tool_stats', JSON.stringify(nextStats));
          return nextStats;
      });
  };

  const getToolStats = (toolName: string) => {
      return toolStats[toolName] || { average: 0, count: 0 };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      refreshUser, 
      openLoginModal: () => setIsLoginModalOpen(true),
    }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <FavoritesContext.Provider value={{ favoriteTools, toggleFavorite }}>
            <PriceAlertsContext.Provider value={{ alerts, addAlert, removeAlert, getAlert, notifications, dismissNotification }}>
                <HistoryContext.Provider value={{ recentlyViewed, addToHistory, clearHistory }}>
                    <RatingsContext.Provider value={{ userRatings, getToolStats, rateTool }}>
                        {children}
                        
                        {/* Notification Toast Container */}
                        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
                            {notifications.map((msg, idx) => (
                                <div key={idx} className="bg-secondary text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-4 animate-fade-in">
                                    <span>{msg}</span>
                                    <button onClick={() => dismissNotification(idx)} className="hover:text-gray-200 font-bold">&times;</button>
                                </div>
                            ))}
                        </div>

                        {isLoginModalOpen && (
                            <LoginPage 
                            onLoginSuccess={() => {}} 
                            onClose={() => setIsLoginModalOpen(false)} 
                            />
                        )}
                    </RatingsContext.Provider>
                </HistoryContext.Provider>
            </PriceAlertsContext.Provider>
        </FavoritesContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
