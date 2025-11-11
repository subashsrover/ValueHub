import React, { useState, useEffect } from 'react';
import { TOOLS, CATEGORIES } from '../constants';
import type { Tool } from '../types';
import { SearchIcon } from './icons';

interface ToolsPageProps {
  onBackClick: () => void;
}

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => (
    <div 
        className="group relative aspect-square bg-dark-800 rounded-xl p-4 flex flex-col items-center justify-center gap-4 cursor-pointer transform hover:scale-105 hover:bg-dark-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/30"
        onClick={onClick}
    >
        <div className="w-16 h-16 sm:w-20 sm:h-20 transition-all duration-300 p-1">
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
        <p className="text-light-200 font-semibold text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {tool.name}
        </p>
        
        {/* Tooltip */}
        <div 
            role="tooltip"
            className="absolute bottom-full mb-2 w-72 bg-dark-900 text-light-100 text-sm rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 transform -translate-x-1/2 left-1/2 group-hover:delay-300"
        >
            <p className="font-bold text-base mb-1">{tool.name}</p>
            <p className="text-light-200">{tool.description}</p>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-dark-900"></div>
        </div>
    </div>
);

const ToolDetailModal: React.FC<{ tool: Tool; onClose: () => void }> = ({ tool, onClose }) => {
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
                    <h2 id="tool-name" className="text-3xl font-bold text-light-100 mb-3">{tool.name}</h2>
                    <p className="text-light-200">{tool.description}</p>
                </div>
            </div>
        </div>
    );
};

const ToolsPage: React.FC<ToolsPageProps> = ({ onBackClick }) => {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

    const filteredTools = TOOLS.filter(tool =>
        (selectedCategory === 'All' || tool.category === selectedCategory) &&
        (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <div className="relative w-full max-w-lg mb-8">
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

          <div className="flex flex-wrap justify-center gap-2">
            <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${selectedCategory === 'All' ? 'bg-secondary text-white' : 'bg-dark-700 text-light-200 hover:bg-dark-600'}`}
            >
                All
            </button>
            {CATEGORIES.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${selectedCategory === category ? 'bg-secondary text-white' : 'bg-dark-700 text-light-200 hover:bg-dark-600'}`}
                >
                    {category}
                </button>
            ))}
          </div>
        </div>
        
        {filteredTools.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {filteredTools.map((tool, index) => (
                    <ToolCard key={index} tool={tool} onClick={() => setSelectedTool(tool)} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-light-200">No tools found matching your criteria.</p>
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
      {selectedTool && <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
    </>
  );
};

export default ToolsPage;