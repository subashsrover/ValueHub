
import React, { useState, useEffect, useRef } from 'react';
import { TOOLS, CATEGORIES, CATEGORY_DESCRIPTIONS, DURATIONS, TAGS, TAG_COLORS } from '../constants';
import type { Tool } from '../types';
import { SearchIcon, StarIcon, GridIcon, ListIcon } from './icons';

interface ToolsPageProps {
  onBackClick: () => void;
  onEnquireClick: () => void;
  isLoggedIn: boolean;
  favoriteTools: Tool[];
  onToggleFavorite: (tool: Tool) => void;
}

interface ToolCardProps {
    tool: Tool;
    onClick: () => void;
    isLoggedIn: boolean;
    isFavorite: boolean;
    onFavoriteClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick, isLoggedIn, isFavorite, onFavoriteClick }) => (
    <div 
        className="group relative flex flex-col items-center justify-start text-center p-2 cursor-pointer transition-all duration-300 ease-in-out"
        onClick={onClick}
    >
        {isLoggedIn && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteClick();
                }}
                className="absolute top-1 right-1 z-20 p-1 rounded-full bg-dark-900/50 hover:bg-dark-900/80 text-yellow-400 hover:text-yellow-300 transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <StarIcon filled={isFavorite} className="w-4 h-4" />
            </button>
        )}
        <div className="relative w-16 h-16 mb-2">
            <div className="absolute inset-0 bg-dark-800 rounded-xl transform group-hover:scale-110 group-hover:bg-dark-700 transition-all duration-300 shadow-lg group-hover:shadow-primary/30"></div>
            <img 
                src={tool.imageUrl} 
                alt={`${tool.name} logo`} 
                className="w-full h-full object-contain p-2 relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // prevent infinite loop
                    target.src = 'https://via.placeholder.com/150/1e293b/f1f5f9?text=Logo'; // Fallback image
                }}
            />
            {tool.tags && tool.tags.length > 0 && (
              <div className="absolute top-0 left-0 -mt-1 -ml-1 z-20 transform group-hover:scale-110 transition-transform duration-300">
                <span className={`${TAG_COLORS[tool.tags[0]] || 'bg-gray-500 text-white'} text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md`}>
                  {tool.tags[0]}
                </span>
              </div>
            )}
        </div>
        <p className="text-light-200 text-xs font-medium w-full truncate px-1">
            {tool.name}
        </p>
        
        {/* Tooltip */}
        <div 
            role="tooltip"
            className="absolute bottom-full mb-2 w-72 bg-dark-900 text-light-100 text-sm rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 transform -translate-x-1/2 left-1/2 group-hover:delay-300"
        >
            <p className="font-bold text-base mb-1">{tool.name}</p>
            <p className="text-light-200">{tool.description}</p>
            {tool.offerPrice != null && tool.originalPrice != null && (
                <div className="mt-2 pt-2 border-t border-dark-700/50 flex justify-center items-baseline gap-2">
                    <span className="text-secondary font-bold text-lg">${tool.offerPrice}</span>
                    <span className="text-light-200/50 line-through">${tool.originalPrice}</span>
                </div>
            )}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-dark-900"></div>
        </div>
    </div>
);

const ToolListItem: React.FC<ToolCardProps> = ({ tool, onClick, isLoggedIn, isFavorite, onFavoriteClick }) => (
    <div 
        className="group relative flex items-center gap-4 p-4 bg-dark-800 rounded-xl hover:bg-dark-700 transition-all duration-300 ease-in-out cursor-pointer shadow-sm hover:shadow-md"
        onClick={onClick}
    >
        {/* Image */}
        <div className="relative w-16 h-16 flex-shrink-0 bg-white/5 rounded-lg p-2">
            <img 
                src={tool.imageUrl} 
                alt={`${tool.name} logo`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/150/1e293b/f1f5f9?text=Logo';
                }}
            />
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col md:flex-row md:items-center gap-4 overflow-hidden">
            {/* Name & Tags */}
            <div className="md:w-1/4 min-w-[180px] flex-shrink-0">
                <h3 className="text-lg font-bold text-light-100 truncate">{tool.name}</h3>
                {tool.tags && tool.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {tool.tags.slice(0, 2).map(tag => (
                             <span key={tag} className={`${TAG_COLORS[tag] || 'bg-gray-500 text-white'} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                                {tag}
                            </span>
                        ))}
                         {tool.tags.length > 2 && <span className="text-[10px] text-light-200/50">+{tool.tags.length - 2}</span>}
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="flex-grow md:border-l md:border-dark-600 md:pl-4">
                 <p className="text-light-200 text-sm line-clamp-2 md:line-clamp-3">{tool.description}</p>
            </div>
        </div>

        {/* Right Side: Price & Actions */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2 ml-2 min-w-[100px]">
             {tool.offerPrice != null ? (
                 <div className="text-right">
                     <span className="block text-secondary font-bold">${tool.offerPrice}</span>
                     {tool.originalPrice && <span className="block text-xs text-light-200/50 line-through">${tool.originalPrice}</span>}
                 </div>
             ) : (
                 <span className="text-xs text-light-200/50">View Details</span>
             )}
             
             {isLoggedIn && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteClick();
                    }}
                    className={`p-1.5 rounded-full transition-colors ${isFavorite ? 'text-yellow-400 bg-yellow-400/10' : 'text-light-200/30 hover:text-yellow-400 hover:bg-dark-600'}`}
                >
                    <StarIcon filled={isFavorite} className="w-5 h-5" />
                </button>
            )}
        </div>
    </div>
);

interface ToolDetailModalProps {
    tool: Tool;
    onClose: () => void;
    isLoggedIn: boolean;
    isFavorite: boolean;
    onFavoriteClick: () => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose, isLoggedIn, isFavorite, onFavoriteClick }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tool-name"
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-dark-800 rounded-2xl p-8 max-w-lg w-full m-4 shadow-2xl transform animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="text-light-200 hover:text-white transition-colors text-3xl leading-none font-bold -mt-4 -mr-2"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6 bg-white/10 rounded-xl p-2 flex items-center justify-center">
                        <img 
                            src={tool.imageUrl} 
                            alt={`${tool.name} logo`} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // prevent infinite loop
                                target.src = 'https://via.placeholder.com/150/1e293b/f1f5f9?text=Logo'; // Fallback image
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <h2 id="tool-name" className="text-3xl font-bold text-light-100">{tool.name}</h2>
                         {isLoggedIn && (
                            <button
                                onClick={onFavoriteClick}
                                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <StarIcon filled={isFavorite} className="w-7 h-7" />
                            </button>
                        )}
                    </div>
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {tool.tags.map(tag => (
                          <span key={tag} className={`${TAG_COLORS[tag] || 'bg-gray-500 text-white'} text-xs font-bold px-2.5 py-1 rounded-full`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-light-200">{tool.description}</p>

                    {tool.offerPrice != null && tool.originalPrice != null && (
                        <div className="mt-6 w-full bg-dark-900/50 rounded-lg p-4 text-center">
                            <p className="text-sm font-semibold text-light-200/70 tracking-wider">EXCLUSIVE OFFER</p>
                            <div className="flex items-center justify-center gap-4 mt-2">
                                <span className="text-5xl font-bold text-secondary">${tool.offerPrice}</span>
                                <div className="text-left">
                                    <span className="text-xl text-light-200/50 line-through">${tool.originalPrice}</span>
                                    <span className="block text-lg font-bold text-accent">
                                        Save {Math.round(((tool.originalPrice - tool.offerPrice) / tool.originalPrice) * 100)}%
                                    </span>
                                </div>
                            </div>
                            {tool.duration && <p className="text-xs text-light-200/50 mt-2">for {tool.duration}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ToolsPage: React.FC<ToolsPageProps> = ({ onBackClick, onEnquireClick, isLoggedIn, favoriteTools, onToggleFavorite }) => {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedDuration, setSelectedDuration] = useState<string>('All Durations');
    const [selectedTag, setSelectedTag] = useState<string>('All Tags');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedTool) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedTool]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredTools = TOOLS.filter(tool => {
        if (showFavoritesOnly && !favoriteTools.some(fav => fav.name === tool.name)) {
            return false;
        }
        return (selectedCategory === 'All' || tool.category === selectedCategory) &&
            (selectedDuration === 'All Durations' || tool.duration === selectedDuration) &&
            (selectedTag === 'All Tags' || (tool.tags && tool.tags.includes(selectedTag))) &&
            (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsCategoryDropdownOpen(false);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedDuration('All Durations');
        setSelectedTag('All Tags');
        setShowFavoritesOnly(false);
    };

    const DropdownArrow = ({ isOpen }: { isOpen: boolean }) => (
        <svg className={`fill-current h-5 w-5 text-light-200/70 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
    );

    const SelectArrow = () => (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-light-200/50">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </div>
    );

  return (
    <>
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Explore Our Toolkit
          </h1>
          <p className="max-w-2xl text-lg text-light-200 mb-8">
            A curated collection of industry-leading software. Click on any logo to learn more.
          </p>
          <div className="relative w-full max-w-2xl mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-light-200/50">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search for a tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 border border-dark-700 text-light-100 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {/* Category Dropdown */}
                <div className="relative w-full" ref={categoryDropdownRef}>
                    <button
                        onClick={() => setIsCategoryDropdownOpen(prev => !prev)}
                        className="w-full flex justify-between items-center bg-dark-800 border border-dark-700 text-light-100 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
                        aria-haspopup="listbox"
                        aria-expanded={isCategoryDropdownOpen}
                    >
                        <span className="truncate pr-2">{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</span>
                        <DropdownArrow isOpen={isCategoryDropdownOpen} />
                    </button>
                    {isCategoryDropdownOpen && (
                         <div 
                            role="listbox"
                            className="absolute z-10 mt-2 w-full bg-dark-800 border border-dark-700 rounded-xl shadow-lg max-h-60 overflow-y-auto animate-fade-in"
                        >
                            <button
                                onClick={() => handleCategorySelect('All')}
                                className={`w-full text-left px-4 py-2 text-light-100 hover:bg-dark-700 transition-colors duration-200 ${selectedCategory === 'All' ? 'font-bold text-secondary' : ''}`}
                                role="option"
                                aria-selected={selectedCategory === 'All'}
                            >
                                All Categories
                            </button>
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className={`w-full text-left px-4 py-2 text-light-100 hover:bg-dark-700 transition-colors duration-200 ${selectedCategory === category ? 'font-bold text-secondary' : ''}`}
                                    role="option"
                                    aria-selected={selectedCategory === category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {/* Duration Dropdown */}
                <div className="relative w-full">
                    <select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-full appearance-none bg-dark-800 border border-dark-700 text-light-100 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
                        aria-label="Filter by duration"
                    >
                        {DURATIONS.map(duration => (
                            <option key={duration} value={duration}>{duration}</option>
                        ))}
                    </select>
                    <SelectArrow />
                </div>
                {/* Tag Dropdown */}
                <div className="relative w-full">
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="w-full appearance-none bg-dark-800 border border-dark-700 text-light-100 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
                        aria-label="Filter by tag"
                    >
                        {TAGS.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                    <SelectArrow />
                </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="bg-dark-800 border border-dark-700 rounded-full p-1 flex items-center shrink-0 mt-4 md:mt-0">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'grid' ? 'bg-dark-700 text-white shadow-sm' : 'text-light-200 hover:text-white'}`}
                    aria-label="Grid View"
                >
                    <GridIcon />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'list' ? 'bg-dark-700 text-white shadow-sm' : 'text-light-200 hover:text-white'}`}
                    aria-label="List View"
                >
                    <ListIcon />
                </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {(searchQuery || selectedCategory !== 'All' || selectedDuration !== 'All Durations' || selectedTag !== 'All Tags' || showFavoritesOnly) && (
              <button
                onClick={handleClearFilters}
                className="text-secondary hover:text-blue-400 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-full px-4 py-1 text-sm"
              >
                Clear Filters
              </button>
            )}
            {isLoggedIn && (
                <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex items-center gap-2 font-semibold transition-colors duration-300 rounded-full px-4 py-2 text-sm ${
                        showFavoritesOnly
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400'
                            : 'text-light-200/70 hover:text-yellow-400 border border-dark-700 hover:border-yellow-400/50'
                    }`}
                >
                    <StarIcon filled={showFavoritesOnly} className="w-4 h-4" />
                    My Favorites {showFavoritesOnly ? `(${favoriteTools.length})` : ''}
                </button>
            )}
          </div>

        </div>
        
        {selectedCategory !== 'All' && CATEGORY_DESCRIPTIONS[selectedCategory] && (
            <div className="text-center max-w-3xl mx-auto mb-12 -mt-2">
                <p className="text-lg text-light-200">{CATEGORY_DESCRIPTIONS[selectedCategory]}</p>
            </div>
        )}

        <div className="bg-dark-800/50 rounded-xl p-4 text-center mb-12">
            <p className="text-light-200">
                Can't find the tool you're looking for? Let us know!
            </p>
            <button
                onClick={onEnquireClick}
                className="mt-3 bg-secondary text-white font-bold py-2 px-6 rounded-full text-base hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-secondary/40 focus:outline-none focus:ring-4 focus:ring-secondary/50"
            >
                Enquire for a Tool
            </button>
        </div>

        {filteredTools.length > 0 ? (
            viewMode === 'grid' ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-4 gap-y-6">
                    {filteredTools.map((tool) => (
                        <ToolCard
                            key={`${tool.name}-${tool.category}`}
                            tool={tool}
                            onClick={() => setSelectedTool(tool)}
                            isLoggedIn={isLoggedIn}
                            isFavorite={favoriteTools.some(fav => fav.name === tool.name)}
                            onFavoriteClick={() => onToggleFavorite(tool)}
                        />
                    ))}
                </div>
            ) : (
                 <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                    {filteredTools.map((tool) => (
                        <ToolListItem
                            key={`${tool.name}-${tool.category}`}
                            tool={tool}
                            onClick={() => setSelectedTool(tool)}
                            isLoggedIn={isLoggedIn}
                            isFavorite={favoriteTools.some(fav => fav.name === tool.name)}
                            onFavoriteClick={() => onToggleFavorite(tool)}
                        />
                    ))}
                </div>
            )
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-light-200">No tools found matching your criteria.</p>
                {showFavoritesOnly && <p className="text-light-200/70 mt-2">You haven't favorited any tools yet. Click the star icon on a tool to save it!</p>}
            </div>
        )}

        <div className="text-center mt-16">
          <button
            onClick={onBackClick}
            className="bg-dark-700 text-light-100 font-bold py-3 px-8 rounded-full text-lg hover:bg-dark-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-dark-600/50"
          >
            &larr; Back to Home
          </button>
        </div>
      </div>
      {selectedTool && <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        isLoggedIn={isLoggedIn}
        isFavorite={favoriteTools.some(fav => fav.name === selectedTool.name)}
        onFavoriteClick={() => onToggleFavorite(selectedTool)}
      />}
    </>
  );
};

export default ToolsPage;
