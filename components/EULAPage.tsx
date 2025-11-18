
import React from 'react';

interface EULAPageProps {
  onBackClick: () => void;
}

const EULAPage: React.FC<EULAPageProps> = ({ onBackClick }) => {
  return (
    <div className="container mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
          End-User License Agreement (EULA)
        </h1>
        <div className="bg-dark-800 rounded-xl p-8 space-y-6 text-light-200 text-left">
            <p className="text-light-200/80">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-4">
              <p>This End-User License Agreement ("EULA") is a legal agreement between you and Value Hub. This EULA governs your acquisition and use of software ("Software") directly from Value Hub or indirectly through a Value Hub authorized reseller or distributor.</p>

              <h2 className="text-2xl font-bold text-secondary">1. License Grant</h2>
              <p>Value Hub grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Software solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement and any documentation provided by the original software vendor.</p>
              
              <h2 className="text-2xl font-bold text-secondary">2. Restrictions on Use</h2>
              <p>You agree not to, and you will not permit others to license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Software or make the Software available to any third party. You may not copy (except as expressly permitted by this license and the Usage Rules), decompile, reverse engineer, disassemble, attempt to derive the source code of, modify, or create derivative works of the Software.</p>
              
              <h2 className="text-2xl font-bold text-secondary">3. Intellectual Property</h2>
              <p>The Software, including without limitation all copyrights, patents, trademarks, trade secrets and other intellectual property rights are, and shall remain, the sole and exclusive property of the original software vendor. Value Hub does not claim any ownership of the intellectual property of the tools listed.</p>

              <h2 className="text-2xl font-bold text-secondary">4. Termination</h2>
              <p>This Agreement shall remain in effect until terminated by you or Value Hub. Value Hub may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice. This EULA will terminate immediately, without prior notice from Value Hub, in the event that you fail to comply with any provision of this EULA.</p>
              
              <h2 className="text-2xl font-bold text-secondary">5. Governing Law</h2>
              <p>This Agreement and your use of the Software are governed by and construed in accordance with the laws of the State, applicable to agreements made and to be entirely performed within the State, without regard to its conflict of law principles.</p>
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

export default EULAPage;
