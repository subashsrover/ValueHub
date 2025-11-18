
import React, { useState } from 'react';
import type { Enquiry } from '../types';

interface EnquirePageProps {
  onBackClick: () => void;
}

const EnquirePage: React.FC<EnquirePageProps> = ({ onBackClick }) => {
  const [formData, setFormData] = useState<Omit<Enquiry, 'submittedAt'>>({
    toolName: '',
    name: '',
    email: '',
    reason: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.toolName || !formData.name || !formData.email) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');

    // Save enquiry to localStorage to simulate a database
    try {
      const newEnquiry: Enquiry = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      const existingEnquiriesRaw = localStorage.getItem('enquiries');
      const existingEnquiries: Enquiry[] = existingEnquiriesRaw ? JSON.parse(existingEnquiriesRaw) : [];
      const updatedEnquiries = [...existingEnquiries, newEnquiry];
      localStorage.setItem('enquiries', JSON.stringify(updatedEnquiries));
      console.log('Enquiry saved to DB:', newEnquiry);
    } catch (err) {
      console.error('Failed to save enquiry to localStorage:', err);
      setError('There was an error submitting your enquiry. Please try again.');
      return;
    }
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-16 sm:py-24 text-center animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Thank You!</h1>
        <p className="text-lg text-light-200 mb-8">
          Your enquiry has been submitted successfully. We'll review your request and get back to you shortly.
        </p>
        <button
          onClick={onBackClick}
          className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-500 transition-colors duration-300"
        >
          Back to Tools
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Enquire for a Tool
          </h1>
          <p className="text-lg md:text-xl text-light-200">
            Looking for a specific tool that's not on our list? Fill out the form below, and we'll look into adding it to our collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-800 rounded-xl p-8 space-y-6">
          <div>
            <label htmlFor="toolName" className="block text-sm font-medium text-light-100 mb-2">Tool Name*</label>
            <input
              type="text"
              name="toolName"
              id="toolName"
              value={formData.toolName}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-dark-700 text-light-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-light-100 mb-2">Your Name*</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-dark-700 text-light-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-light-100 mb-2">Your Email*</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-dark-700 text-light-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-light-100 mb-2">Reason for Request (Optional)</label>
            <textarea
              name="reason"
              id="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-dark-700 text-light-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors duration-300"
            ></textarea>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
             <button
              type="submit"
              className="w-full sm:w-auto bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-secondary/40 focus:outline-none focus:ring-4 focus:ring-secondary/50"
            >
              Submit Enquiry
            </button>
            <button
              type="button"
              onClick={onBackClick}
              className="w-full sm:w-auto text-light-100 font-bold py-3 px-8 rounded-full text-lg hover:bg-dark-700 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquirePage;
