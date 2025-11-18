
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TOOLS, CATEGORIES, CATEGORY_DESCRIPTIONS, DURATIONS, TAGS, TAG_COLORS } from '../constants';
import type { Tool } from '../types';
import { 
    SearchIcon, StarIcon, BellIcon, CompareIcon, CheckIcon, HeartIcon, ZapIcon, GridIcon, ListIcon 
} from './icons';
import { useAuth, useFavorites, usePriceAlerts, useHistory, useRatings } from './Providers';
import Link from 'next/link';

// --- 3D Tilt Card Wrapper ---
const TiltCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.02 }}
            className={`relative cursor-pointer group perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- Tool Detail Modal (Unchanged Logic, Updated UI for consistency) ---
const ToolDetailModal = ({ tool, onClose, isLoggedIn, isFavorite, onFavoriteClick, userRating, onRate, hasAlert, onAlertClick }: any) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-dark-900/90 backdrop-blur-md flex items-center justify-center z-[60] animate-fade-in p-4" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-dark-800/95 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden ring-1 ring-white/10" 
                onClick={e => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="w-full md:w-1/3 bg-gradient-to-br from-light-100 to-light-200 flex items-center justify-center p-8 relative">
                    <img src={tool.imageUrl} alt={tool.name} className="w-full h-auto object-contain max-h-64 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {tool.tags?.map((tag: string) => (
                             <span key={tag} className={`text-xs font-bold px-2 py-1 rounded-full shadow-lg ${TAG_COLORS[tag] || 'bg-gray-600 text-white'}`}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/3 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-light-100">{tool.name}</h2>
                            <p className="text-secondary font-medium">{tool.category}</p>
                        </div>
                        <button onClick={onClose} className="text-light-200 hover:text-white text-3xl leading-none transition-colors">&times;</button>
                    </div>

                    <p className="text-light-200 mb-6 text-lg leading-relaxed">{tool.description}</p>

                    {/* Price & Actions */}
                    <div className="bg-dark-900/50 rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5">
                         <div>
                             {tool.originalPrice && <span className="text-light-200/50 line-through text-sm">Was ${tool.originalPrice}</span>}
                             <div className="text-3xl font-bold text-green-400 flex items-baseline gap-2">
                                 ${tool.offerPrice || 0}
                                 <span className="text-sm text-light-200 font-normal">/ {tool.duration}</span>
                             </div>
                         </div>
                         <div className="flex gap-3">
                             <button onClick={onAlertClick} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-colors ${hasAlert ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-dark-700 text-light-200 hover:text-white hover:bg-dark-600'}`}>
                                 <BellIcon className="w-5 h-5" filled={hasAlert} />
                             </button>
                             <button onClick={onFavoriteClick} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-colors ${isFavorite ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-dark-700 text-light-200 hover:text-white hover:bg-dark-600'}`}>
                                 <HeartIcon className="w-5 h-5" filled={isFavorite} />
                             </button>
                             <a href={`https://${tool.domain}`} target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-secondary/40">
                                 Visit Website
                             </a>
                         </div>
                    </div>

                    {/* Ratings */}
                    <div>
                        <h3 className="text-light-100 font-bold mb-2 flex items-center gap-2">
                            Rate this Tool
                            {userRating > 0 && <span className="text-xs font-normal text-green-400">(You rated: {userRating})</span>}
                        </h3>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star} 
                                    onClick={() => onRate(star)}
                                    className="focus:outline-none hover:scale-110 transition-transform"
                                >
                                    <StarIcon 
                                        className={`w-8 h-8 transition-colors ${star <= userRating ? 'text-yellow-400' : 'text-dark-600 hover:text-yellow-400/50'}`} 
                                        filled={star <= userRating} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Comparison Modal ---
const ComparisonModal = ({ tools, onClose, onRemove }: { tools: Tool[], onClose: () => void, onRemove: (name: string) => void }) => {
    return (
        <div className="fixed inset-0 bg-dark-900/95 backdrop-blur-sm flex items-center justify-center z-[70] animate-fade-in p-4" onClick={onClose}>
             <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-dark-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10 p-6" 
                onClick={e => e.stopPropagation()}
             >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-light-100 flex items-center gap-2">
                        <CompareIcon className="w-6 h-6 text-secondary" /> Tool Comparison
                    </h2>
                    <button onClick={onClose} className="text-light-200 hover:text-white text-2xl">&times;</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-dark-700 min-w-[150px] text-light-200/70">Feature</th>
                                {tools.map(tool => (
                                    <th key={tool.name} className="p-4 border-b border-dark-700 min-w-[250px]">
                                        <div className="flex justify-between items-start">
                                            <span className="text-xl font-bold text-light-100 block mb-2">{tool.name}</span>
                                            <button onClick={() => onRemove(tool.name)} className="text-red-400 hover:text-red-300 text-xs border border-red-500/30 px-2 py-1 rounded hover:bg-red-500/10 transition-colors">&times; Remove</button>
                                        </div>
                                        <div className="h-24 w-full bg-white/5 rounded-lg flex items-center justify-center p-2 border border-white/5">
                                            <img src={tool.imageUrl} alt="logo" className="max-h-full max-w-full object-contain" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-light-200">
                            <tr>
                                <td className="p-4 border-b border-dark-700 font-bold">Price</td>
                                {tools.map(tool => (
                                    <td key={tool.name} className="p-4 border-b border-dark-700">
                                        <span className="text-green-400 font-bold text-lg">${tool.offerPrice}</span>
                                        {tool.originalPrice && <span className="text-xs line-through opacity-50 ml-2">${tool.originalPrice}</span>}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-dark-700 font-bold">Duration</td>
                                {tools.map(tool => (
                                    <td key={tool.name} className="p-4 border-b border-dark-700">{tool.duration}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-dark-700 font-bold">Category</td>
                                {tools.map(tool => (
                                    <td key={tool.name} className="p-4 border-b border-dark-700 text-sm">{tool.category}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-dark-700 font-bold">Description</td>
                                {tools.map(tool => (
                                    <td key={tool.name} className="p-4 border-b border-dark-700 text-sm">{tool.description}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-dark-700 font-bold">Website</td>
                                {tools.map(tool => (
                                    <td key={tool.name} className="p-4 border-b border-dark-700">
                                         {/* Security: Prevent tabnabbing */}
                                        <a href={`https://${(tool as any).domain}`} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline text-sm">
                                            Visit Site &rarr;
                                        </a>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
             </motion.div>
        </div>
    );
};

// --- ToolCard Component ---
const ToolCard = ({ 
    tool, onClick, isLoggedIn, isFavorite, onFavoriteClick, stats, hasAlert, onAlertClick, isCompareSelected, onCompareToggle 
}: {
    tool: Tool, 
    onClick: () => void, 
    isLoggedIn: boolean, 
    isFavorite: boolean, 
    onFavoriteClick: () => void, 
    stats: { average: number, count: number }, 
    hasAlert: boolean, 
    onAlertClick: () => void,
    isCompareSelected: boolean,
    onCompareToggle: () => void
}) => {
    return (
        <TiltCard onClick={onClick} className={`h-full flex flex-col bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${isCompareSelected ? 'border-secondary ring-2 ring-secondary' : 'border-white/10 hover:border-secondary/50'}`}>
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             
             <div className="relative h-40 bg-dark-900/50 overflow-hidden">
                <img 
                    src={tool.imageUrl} 
                    alt={tool.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                    onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Value+Hub'}} 
                />
                <div className="absolute top-2 right-2 flex gap-2 z-10 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 ease-out">
                     <button 
                        onClick={(e) => { e.stopPropagation(); onFavoriteClick(); }} 
                        className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-lg ${isFavorite ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-black/40 text-white hover:bg-black/60 border border-white/10'}`}
                        title="Add to Wishlist"
                    >
                        <HeartIcon className="w-5 h-5" filled={isFavorite} />
                     </button>
                </div>
                {tool.tags && tool.tags.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {tool.tags.map((tag: string) => (
                            <span key={tag} className={`text-[10px] font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm ${TAG_COLORS[tag] || 'bg-gray-600 text-white'}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
             </div>
             
             <div className="p-5 flex-grow flex flex-col relative z-10" style={{ transform: "translateZ(20px)" }}>
                 <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg text-light-100 leading-tight group-hover:text-secondary transition-colors line-clamp-1" title={tool.name}>{tool.name}</h3>
                        <p className="text-xs text-light-200/70 mt-1 truncate">{tool.category.split(' ')[1] || tool.category}</p>
                    </div>
                 </div>
                 
                 <p className="text-sm text-light-200/80 mb-4 line-clamp-2 leading-relaxed" title={tool.description}>{tool.description}</p>
                 
                 <div className="mt-auto space-y-3">
                     <div className="flex items-center justify-between text-xs text-light-200/80 bg-dark-900/30 p-2 rounded-lg border border-white/5">
                        <div className="flex items-center gap-1" title={`${stats?.average} out of 5`}>
                             <StarIcon className="w-3.5 h-3.5 text-yellow-400" filled />
                             <span className="font-medium text-white">{stats?.average?.toFixed(1) || 'N/A'}</span>
                             <span className="text-light-200/50">({stats?.count || 0})</span>
                        </div>
                        <span className="text-secondary font-medium">{tool.duration}</span>
                     </div>
                     
                     <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                         <div className="flex flex-col">
                             {tool.originalPrice && <span className="text-xs text-light-200/50 line-through">${tool.originalPrice}</span>}
                             <div className="flex items-center gap-1 text-green-400 font-bold text-lg shadow-green-400/20 drop-shadow-sm">
                                 ${tool.offerPrice || 0}
                                 {tool.originalPrice && tool.offerPrice && (
                                     <span className="text-[10px] bg-green-500/20 px-1.5 py-0.5 rounded ml-1 text-green-300">
                                         -{Math.round(((tool.originalPrice - tool.offerPrice) / tool.originalPrice) * 100)}%
                                     </span>
                                 )}
                             </div>
                         </div>
                         <button className="bg-white/5 hover:bg-secondary text-white p-2 rounded-lg transition-colors border border-white/10 hover:border-secondary/50 shadow-lg hover:shadow-secondary/20">
                            <ZapIcon className="w-5 h-5" />
                         </button>
                     </div>
                 </div>
             </div>
             
             {/* Actions Footer */}
             <div className="bg-dark-900/40 p-2 flex items-center justify-between border-t border-white/10 backdrop-blur-sm">
                 <button onClick={(e) => { e.stopPropagation(); onAlertClick(); }} className={`flex-1 flex items-center justify-center gap-1 text-xs py-1 rounded transition-colors ${hasAlert ? 'text-yellow-400' : 'text-light-200 hover:text-white'}`}>
                     <BellIcon className="w-4 h-4" filled={hasAlert} />
                     {hasAlert ? 'On' : 'Alert'}
                 </button>
                 <div className="w-px h-4 bg-white/10 mx-1"></div>
                 <button onClick={(e) => { e.stopPropagation(); onCompareToggle(); }} className={`flex-1 flex items-center justify-center gap-1 text-xs py-1 rounded transition-colors ${isCompareSelected ? 'text-secondary font-bold' : 'text-light-200 hover:text-white'}`}>
                     <CompareIcon className="w-4 h-4" />
                     Compare
                 </button>
             </div>
        </TiltCard>
    );
};

// --- Main Component ---
interface ToolsPageProps {
  onBackClick?: () => void;
  onEnquireClick?: () => void;
  isLoggedIn?: boolean;
  favoriteTools?: Tool[];
  onToggleFavorite?: (tool: Tool) => void;
}

const ToolsPage: React.FC<ToolsPageProps> = (props) => {
  // Hooks for context (safely accessed)
  const authContext = useAuth();
  const favoritesContext = useFavorites();
  const alertsContext = usePriceAlerts();
  const historyContext = useHistory();
  const ratingsContext = useRatings();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All Durations');
  const [selectedTag, setSelectedTag] = useState('All Tags');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Resolve Data Sources
  const isLoggedIn = props.isLoggedIn ?? (authContext?.user != null);
  const favoriteTools = props.favoriteTools ?? favoritesContext?.favoriteTools ?? [];
  const onToggleFavorite = props.onToggleFavorite ?? favoritesContext?.toggleFavorite ?? (() => {});
  
  const recentlyViewed = historyContext?.recentlyViewed || [];
  const clearHistory = historyContext?.clearHistory || (() => {});

  // Filter Logic
  const filteredTools = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();
    
    return TOOLS.filter(tool => {
        const matchesSearch = normalizedSearch === '' || 
                              (tool.name && tool.name.toLowerCase().includes(normalizedSearch)) || 
                              (tool.description && tool.description.toLowerCase().includes(normalizedSearch));
        
        const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchesDuration = selectedDuration === 'All Durations' || tool.duration === selectedDuration;
        const matchesTag = selectedTag === 'All Tags' || (tool.tags && tool.tags.includes(selectedTag));
        
        return matchesSearch && matchesCategory && matchesDuration && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedDuration, selectedTag]);

  const isFiltering = searchQuery !== '' || selectedCategory !== 'All' || selectedDuration !== 'All Durations' || selectedTag !== 'All Tags';

  const clearFilters = () => {
      setSearchQuery('');
      setSelectedCategory('All');
      setSelectedDuration('All Durations');
      setSelectedTag('All Tags');
  };

  // Handlers
  const handleToolClick = (tool: Tool) => {
      if (historyContext?.addToHistory) {
          historyContext.addToHistory(tool);
      }
      setSelectedTool(tool);
  };

  const setAlertingTool = (toolName: string, currentPrice?: number) => {
      if (!alertsContext?.addAlert) return;
      if (isLoggedIn) {
          const currentAlert = alertsContext.getAlert(toolName);
          if (currentAlert) {
              if(confirm(`Remove price alert for ${toolName}?`)) {
                  alertsContext.removeAlert(toolName);
              }
          } else {
              const price = prompt(`Set alert price for ${toolName} (Current: $${currentPrice})`, currentPrice?.toString());
              const parsed = parseFloat(price || '');
              if (!isNaN(parsed)) {
                  alertsContext.addAlert(toolName, parsed);
                  // Auto favorite on alert set
                  if (!favoriteTools.some(f => f.name === toolName)) {
                      const fullTool = TOOLS.find(t => t.name === toolName);
                      if(fullTool) onToggleFavorite(fullTool);
                  }
              }
          }
      } else {
          if (authContext?.openLoginModal) authContext.openLoginModal();
      }
  };

  const toggleCompare = (toolName: string) => {
      setCompareList(prev => {
          if (prev.includes(toolName)) return prev.filter(n => n !== toolName);
          if (prev.length >= 3) {
              alert("You can only compare up to 3 tools.");
              return prev;
          }
          return [...prev, toolName];
      });
  };

  const getAlert = (name: string) => alertsContext?.getAlert ? alertsContext.getAlert(name) : undefined;

  const handleRate = (toolName: string, rating: number) => {
      if (!isLoggedIn) {
          authContext?.openLoginModal();
          return;
      }
      ratingsContext?.rateTool(toolName, rating);
  };

  return (
    <div className="container mx-auto px-6 py-12 pb-32 relative">
        
        {/* Header & Search */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
        >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-light-100 via-secondary to-light-100 animate-gradient-x">
                Explore Our Universe
            </h1>
            <div className="max-w-2xl mx-auto relative group">
                <SearchIcon className="absolute left-4 top-3.5 text-light-200/50 group-focus-within:text-secondary transition-colors" />
                <input 
                    type="text"
                    placeholder="Search for tools, categories, or software..."
                    className="w-full bg-dark-800/80 backdrop-blur-md border border-white/10 text-light-100 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all shadow-lg group-hover:shadow-secondary/10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </motion.div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-12 w-full"
            >
                 <div className="flex justify-between items-center mb-4 px-2 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-light-200 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            Recently Viewed
                        </h2>
                    </div>
                    <button 
                        onClick={clearHistory}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                        Clear History
                    </button>
                </div>
                <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth no-scrollbar p-1 mask-image-gradient-r">
                    {recentlyViewed.map((tool) => (
                         <div key={`recent-${tool.name}`} className="min-w-[180px] max-w-[180px] flex-shrink-0">
                             <ToolCard
                                tool={tool}
                                onClick={() => handleToolClick(tool)}
                                isLoggedIn={isLoggedIn}
                                isFavorite={favoriteTools.some(fav => fav.name === tool.name)}
                                onFavoriteClick={() => onToggleFavorite(tool)}
                                stats={ratingsContext?.getToolStats?.(tool.name) || { average: 0, count: 0 }}
                                hasAlert={!!getAlert(tool.name)}
                                onAlertClick={() => setAlertingTool(tool.name, tool.offerPrice)}
                                isCompareSelected={compareList.includes(tool.name)}
                                onCompareToggle={() => toggleCompare(tool.name)}
                            />
                         </div>
                    ))}
                </div>
            </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/4 space-y-6">
                {/* Categories */}
                <div className="bg-dark-800/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 sticky top-24 shadow-lg">
                    <h3 className="font-bold text-light-100 mb-3 px-2 flex items-center gap-2">
                        <ListIcon className="w-4 h-4 text-secondary" /> Categories
                    </h3>
                    <div className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                        <button 
                            onClick={() => setSelectedCategory('All')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${selectedCategory === 'All' ? 'bg-secondary text-white shadow-md' : 'text-light-200 hover:bg-white/5'}`}
                        >
                            All Categories
                        </button>
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 truncate ${selectedCategory === cat ? 'bg-secondary text-white shadow-md' : 'text-light-200 hover:bg-white/5'}`}
                                title={cat}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    
                     <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-light-200 mb-2 uppercase tracking-wider">Duration</label>
                            <select 
                                value={selectedDuration} 
                                onChange={(e) => setSelectedDuration(e.target.value)}
                                className="w-full bg-dark-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-light-200 focus:ring-1 focus:ring-secondary outline-none"
                            >
                                {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-light-200 mb-2 uppercase tracking-wider">Tags</label>
                            <select 
                                value={selectedTag} 
                                onChange={(e) => setSelectedTag(e.target.value)}
                                className="w-full bg-dark-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-light-200 focus:ring-1 focus:ring-secondary outline-none"
                            >
                                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        
                        {isFiltering && (
                             <button 
                                onClick={clearFilters}
                                className="w-full mt-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-semibold py-2 rounded-lg text-sm transition-colors"
                             >
                                Reset All Filters
                             </button>
                        )}
                     </div>
                </div>
            </div>

            {/* Grid */}
            <div className="w-full md:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <p className="text-light-200 text-sm">
                        Showing <span className="font-bold text-white">{filteredTools.length}</span> {filteredTools.length === 1 ? 'tool' : 'tools'}
                    </p>
                    <div className="flex gap-2 bg-dark-800/50 p-1 rounded-lg border border-white/10">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-light-200 hover:text-white'}`}>
                            <GridIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-light-200 hover:text-white'}`}>
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                 <div className="mb-6 text-center sm:text-left">
                    <p className="text-sm text-light-200/80 italic bg-secondary/5 border border-secondary/10 p-3 rounded-lg inline-block">
                        {selectedCategory === 'All' 
                            ? "Browsing all tools. Use filters to narrow your search." 
                            : CATEGORY_DESCRIPTIONS[selectedCategory]}
                    </p>
                </div>

                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredTools.map((tool, idx) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                            <ToolCard 
                                tool={tool}
                                onClick={() => handleToolClick(tool)}
                                isLoggedIn={isLoggedIn}
                                isFavorite={favoriteTools.some(fav => fav.name === tool.name)}
                                onFavoriteClick={() => onToggleFavorite(tool)}
                                stats={ratingsContext?.getToolStats?.(tool.name) || { average: 0, count: 0 }}
                                hasAlert={!!getAlert(tool.name)}
                                onAlertClick={() => setAlertingTool(tool.name, tool.offerPrice)}
                                isCompareSelected={compareList.includes(tool.name)}
                                onCompareToggle={() => toggleCompare(tool.name)}
                            />
                        </motion.div>
                    ))}
                </div>
                
                {filteredTools.length === 0 && (
                    <div className="text-center py-20 bg-dark-800/50 rounded-xl border border-dashed border-white/10 backdrop-blur-sm">
                        <div className="mb-4 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                             <SearchIcon className="w-8 h-8 text-light-200/30" />
                        </div>
                        <p className="text-xl text-light-200 font-bold">No tools found</p>
                        <p className="text-light-200/60 mt-2">Try adjusting your filters or search query.</p>
                        <button 
                            onClick={clearFilters}
                            className="mt-4 text-secondary hover:underline font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
                
                <div className="mt-12 text-center">
                     <p className="text-light-200 mb-4">Don't see what you're looking for?</p>
                     {props.onEnquireClick ? (
                        <button
                            onClick={props.onEnquireClick}
                            className="bg-dark-800/80 border border-white/10 text-light-100 font-bold py-3 px-8 rounded-full text-lg hover:bg-secondary hover:border-secondary transition-all duration-300 backdrop-blur-sm"
                        >
                            Enquire for a Tool
                        </button>
                     ) : (
                         <Link
                            href="/enquire"
                            className="inline-block bg-dark-800/80 border border-white/10 text-light-100 font-bold py-3 px-8 rounded-full text-lg hover:bg-secondary hover:border-secondary transition-all duration-300 backdrop-blur-sm"
                        >
                            Enquire for a Tool
                        </Link>
                     )}
                </div>
            </div>
        </div>

        {/* Floating Compare Bar */}
        {compareList.length > 0 && (
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-dark-800/90 backdrop-blur-lg border border-secondary/50 shadow-2xl shadow-secondary/20 rounded-full px-6 py-3 flex items-center gap-6"
            >
                <div className="flex items-center gap-2">
                    <CompareIcon className="w-5 h-5 text-secondary" />
                    <span className="font-bold text-white">{compareList.length} selected</span>
                </div>
                <div className="h-6 w-px bg-white/10"></div>
                <button 
                    onClick={() => setIsCompareModalOpen(true)}
                    className="text-white font-bold hover:text-secondary transition-colors text-sm"
                >
                    Compare Now
                </button>
                <button 
                    onClick={() => setCompareList([])}
                    className="text-light-200 hover:text-red-400 transition-colors text-sm"
                >
                    Clear
                </button>
            </motion.div>
        )}

        {/* Modals */}
        {selectedTool && (
            <ToolDetailModal 
                tool={selectedTool} 
                onClose={() => setSelectedTool(null)}
                isLoggedIn={isLoggedIn}
                isFavorite={favoriteTools.some(fav => fav.name === selectedTool.name)}
                onFavoriteClick={() => onToggleFavorite(selectedTool)}
                userRating={ratingsContext?.userRatings?.[selectedTool.name] || 0}
                onRate={(r: number) => handleRate(selectedTool.name, r)}
                hasAlert={!!getAlert(selectedTool.name)}
                onAlertClick={() => setAlertingTool(selectedTool.name, selectedTool.offerPrice)}
            />
        )}

        {isCompareModalOpen && (
            <ComparisonModal 
                tools={TOOLS.filter(t => compareList.includes(t.name))} 
                onClose={() => setIsCompareModalOpen(false)}
                onRemove={(name) => setCompareList(prev => prev.filter(n => n !== name))}
            />
        )}
    </div>
  );
};

export default ToolsPage;
