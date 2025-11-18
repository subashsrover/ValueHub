
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatIcon, SendIcon, BotIcon, UserIcon, SparklesIcon, ZapIcon, GlobeIcon } from './icons';

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

type ChatMode = 'expert' | 'search' | 'fast';

const CHAT_MODES: { id: ChatMode; label: string; icon: React.ReactNode; model: string; description: string }[] = [
  { 
    id: 'expert', 
    label: 'Expert Chat', 
    icon: <SparklesIcon className="w-4 h-4 text-purple-400" />, 
    model: 'gemini-3-pro-preview',
    description: 'Best for complex questions & reasoning.'
  },
  { 
    id: 'search', 
    label: 'Web Search', 
    icon: <GlobeIcon className="w-4 h-4 text-blue-400" />, 
    model: 'gemini-2.5-flash',
    description: 'Up-to-date info from Google Search.'
  },
  { 
    id: 'fast', 
    label: 'Fast Answer', 
    icon: <ZapIcon className="w-4 h-4 text-yellow-400" />, 
    model: 'gemini-2.5-flash-lite',
    description: 'Instant responses for quick queries.'
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'model', text: 'Hi! I\'m your Value Hub assistant. Ask me about software tools, pricing, or comparisons.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>('expert');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Client
  // Assuming process.env.API_KEY is available as per instructions
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const modeConfig = CHAT_MODES.find(m => m.id === currentMode)!;

    try {
      let response: GenerateContentResponse;
      
      // Configuration based on mode
      const config: any = {
          systemInstruction: "You are a helpful, friendly assistant for 'Value Hub', a software marketplace. Keep answers concise and relevant to software tools.",
      };

      if (currentMode === 'search') {
          config.tools = [{ googleSearch: {} }];
      }

      // Call Gemini API
      response = await ai.models.generateContent({
        model: modeConfig.model,
        contents: userMsg.text,
        config: config
      });

      const responseText = response.text || "I couldn't generate a response.";
      
      // Extract grounding metadata if available (for search mode)
      let sources: { uri: string; title: string }[] = [];
      if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        sources = response.candidates[0].groundingMetadata.groundingChunks
          .map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
          .filter((s: any) => s !== null);
      }

      const botMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          role: 'model', 
          text: responseText,
          sources: sources.length > 0 ? sources : undefined
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-secondary hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Open Chat"
      >
        {isOpen ? <span className="text-2xl font-bold">&times;</span> : <ChatIcon className="w-8 h-8" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[600px] max-h-[80vh] bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl flex flex-col animate-scale-in overflow-hidden">
          
          {/* Header */}
          <div className="bg-dark-900 p-4 border-b border-dark-700 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
                <BotIcon className="w-6 h-6 text-secondary" />
                <div>
                    <h3 className="font-bold text-light-100">Value Hub AI</h3>
                    <p className="text-[10px] text-light-200/70 flex items-center gap-1">
                        Powered by Gemini
                    </p>
                </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="p-2 bg-dark-900/50 border-b border-dark-700 flex gap-1 shrink-0">
             {CHAT_MODES.map(mode => (
                 <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-xs transition-colors ${currentMode === mode.id ? 'bg-dark-700 text-white font-bold' : 'text-light-200 hover:bg-dark-700/50'}`}
                    title={mode.description}
                 >
                     <div className="mb-1">{mode.icon}</div>
                     {mode.label}
                 </button>
             ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-800/95">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-secondary text-white rounded-br-none' 
                    : 'bg-dark-700 text-light-100 rounded-bl-none border border-dark-600'
                }`}>
                  {/* Markdown-like basic parsing for line breaks */}
                  <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                  </div>

                  {/* Search Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">Sources</p>
                          <div className="flex flex-col gap-1">
                              {msg.sources.map((source, idx) => (
                                  <a 
                                    key={idx} 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-300 hover:underline truncate flex items-center gap-1"
                                  >
                                      <GlobeIcon className="w-3 h-3 shrink-0" />
                                      {source.title || source.uri}
                                  </a>
                              ))}
                          </div>
                      </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-dark-700 text-light-100 rounded-2xl rounded-bl-none p-4 border border-dark-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-light-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-light-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-light-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-dark-900 border-t border-dark-700 shrink-0">
            <div className="relative flex items-center">
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentMode === 'search' ? "Ask for latest news or trends..." : "Ask about tools..."}
                    className="w-full bg-dark-800 text-white rounded-xl pl-4 pr-12 py-3 border border-dark-600 focus:outline-none focus:border-secondary resize-none h-12 max-h-32 scrollbar-hide text-sm"
                    rows={1}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2 p-2 bg-secondary text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <SendIcon className="w-4 h-4" />
                </button>
            </div>
             <p className="text-[10px] text-center text-light-200/30 mt-2">
                 AI can make mistakes. Check important info.
             </p>
          </div>
        </div>
      )}
    </>
  );
}
