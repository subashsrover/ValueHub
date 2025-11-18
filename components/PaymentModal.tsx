
import React, { useState } from 'react';
import { api } from '../services/api';
import { ShieldCheckIcon } from './icons';

interface PaymentModalProps {
    onClose: () => void;
    onSuccess: () => void;
    planName: string;
    price: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onSuccess, planName, price }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [error, setError] = useState('');

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers and spaces
        const val = e.target.value.replace(/[^0-9\s]/g, '');
        setCardNumber(val);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (cardNumber.replace(/\s/g, '').length < 13) {
            setError("Invalid card number.");
            return;
        }
        if (cvc.length < 3) {
            setError("Invalid CVC.");
            return;
        }

        setIsProcessing(true);

        const user = api.getCurrentUser();
        if (!user) {
            setError("User session not found. Please log in again.");
            setIsProcessing(false);
            return;
        }

        try {
            // Simulate API call to Stripe/Backend
            await api.upgradePlan(user.id, 'Pro');
            onSuccess();
        } catch (error) {
            console.error("Payment failed", error);
            setError("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-dark-900/90 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in">
            <div className="bg-dark-800 rounded-2xl p-8 max-w-md w-full m-4 shadow-2xl border border-dark-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-light-100">Upgrade to {planName}</h2>
                    <button onClick={onClose} className="text-light-200 hover:text-white text-2xl">&times;</button>
                </div>

                <div className="bg-dark-900/50 p-4 rounded-lg mb-6 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-light-200">Total to pay</p>
                        <p className="text-2xl font-bold text-white">{price}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-light-200">Billed annually</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-light-200 mb-1 uppercase">Card Number</label>
                        <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:outline-none"
                            value={cardNumber}
                            onChange={handleCardChange}
                            maxLength={19}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-light-200 mb-1 uppercase">Expiry</label>
                            <input 
                                type="text" 
                                placeholder="MM/YY"
                                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:outline-none"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                maxLength={5}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-light-200 mb-1 uppercase">CVC</label>
                            <input 
                                type="password" 
                                placeholder="123"
                                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:outline-none"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                                maxLength={4}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isProcessing}
                            className="w-full bg-secondary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-secondary/20"
                        >
                            {isProcessing ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>Pay {price}</>
                            )}
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-light-200/50 mt-4">
                        <ShieldCheckIcon className="w-4 h-4" />
                        Secure SSL Encryption. Simulated Payment.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
