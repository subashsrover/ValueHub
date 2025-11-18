
import React from 'react';

interface DisclaimerPageProps {
  onBackClick: () => void;
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onBackClick }) => {
  return (
    <div className="container mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
          Disclaimer
        </h1>
        <div className="bg-dark-800 rounded-xl p-8 space-y-6 text-light-200 text-left">
            <p className="text-light-200/80">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary">1. General Information</h2>
              <p>The information provided by Value Hub ("we," "us," or "our") on valuehub.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
              
              <h2 className="text-2xl font-bold text-secondary">2. Limitation of Liability</h2>
              <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>
              
              <h2 className="text-2xl font-bold text-secondary">3. External Links Disclaimer</h2>
              <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>

              <h2 className="text-2xl font-bold text-secondary">4. Professional Disclaimer</h2>
              <p>The Site cannot and does not contain financial or legal advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of financial or legal advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE IS SOLELY AT YOUR OWN RISK.</p>

              <h2 className="text-2xl font-bold text-secondary">5. Affiliate Disclaimer</h2>
              <p>The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include the software vendors listed on our platform.</p>
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

export default DisclaimerPage;
