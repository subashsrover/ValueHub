
import React from 'react';

interface ContactPageProps {
  onBackClick: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBackClick }) => {
  return (
    <div className="container mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-light-200 mb-12">
          We'd love to hear from you. Whether you have a question about our tools, partnerships, or anything else, our team is ready to answer all your questions.
        </p>

        <div className="bg-dark-800 rounded-xl p-8 text-left space-y-6">
          <div>
            <h3 className="text-xl font-bold text-secondary mb-2">Email Us</h3>
            <p className="text-light-100">For general inquiries, support, or feedback:</p>
            <a href="mailto:support@valuehub.com" className="text-accent hover:underline">
              support@valuehub.com
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-secondary mb-2">Business Inquiries</h3>
            <p className="text-light-100">For partnership and business-related questions:</p>
            <a href="mailto:business@valuehub.com" className="text-accent hover:underline">
              business@valuehub.com
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-secondary mb-2">Address</h3>
            <p className="text-light-100">
              Value Hub Inc.<br />
              123 Innovation Drive<br />
              Tech City, TX 12345
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={onBackClick}
            className="bg-dark-700 text-light-100 font-bold py-3 px-8 rounded-full text-lg hover:bg-dark-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-dark-600/50"
          >
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;