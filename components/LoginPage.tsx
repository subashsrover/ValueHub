
import React, { useEffect, useState } from 'react';
import { GoogleIcon, LogoIcon } from './icons';
import { api } from '../services/api';

interface LoginPageProps {
    onLoginSuccess: () => void;
    onClose: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleLogin = async () => {
        if(!email) return;
        setLoading(true);
        try {
            // In a real app, this would handle Google OAuth or Password auth
            await api.login(email);
            onLoginSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-dark-800 rounded-2xl p-8 max-w-sm w-full m-4 shadow-2xl transform animate-scale-in border border-dark-700"
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
                <div className="flex flex-col items-center mb-6">
                    <LogoIcon className="w-12 h-12 text-secondary mb-3" />
                    <h1 id="login-title" className="text-2xl font-bold text-light-100">Value Hub Access</h1>
                    <p className="text-light-200 text-center mt-2 text-sm">Enter your email to sign in or create a new account automatically.</p>
                </div>

                <div className="space-y-4">
                    <input 
                        type="email"
                        placeholder="name@company.com"
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
                    >
                        {loading ? 'Signing in...' : (
                            <>
                                <GoogleIcon className="w-5 h-5" />
                                Continue with Email
                            </>
                        )}
                    </button>
                    
                    <p className="text-xs text-center text-light-200/50">
                        Use "admin@valuehub.com" to access the Admin Dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
