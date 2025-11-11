
import React from 'react';
import { GoogleIcon, LogoIcon, WhatsAppIcon } from './icons';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-dark-900 animate-fade-in">
            <div className="w-full max-w-sm">
                <div className="bg-dark-800 shadow-2xl rounded-2xl p-8">
                    <div className="flex flex-col items-center mb-6">
                        <LogoIcon className="w-12 h-12 text-secondary mb-3" />
                        <h1 className="text-2xl font-bold text-light-100">Welcome to Value Hub</h1>
                        <p className="text-light-200 text-center mt-2">Sign in to unlock exclusive tools and software.</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={onLoginSuccess}
                            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
                        >
                            <GoogleIcon className="w-5 h-5" />
                            Sign in with Google
                        </button>
                        
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-dark-700"></div>
                            <span className="flex-shrink mx-4 text-dark-700 font-semibold">OR</span>
                            <div className="flex-grow border-t border-dark-700"></div>
                        </div>

                        <div className="space-y-3">
                             <input
                                type="tel"
                                placeholder="Enter your WhatsApp number"
                                className="w-full bg-dark-900 border border-dark-700 text-light-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
                                aria-label="WhatsApp number"
                            />
                            <button
                                onClick={onLoginSuccess}
                                className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                Sign in with WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
