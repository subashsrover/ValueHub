
import React from 'react';

interface TermsPageProps {
  onBackClick: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBackClick }) => {
  return (
    <div className="container mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
          Terms & Conditions
        </h1>
        <div className="bg-dark-800 rounded-xl p-8 space-y-6 text-light-200 text-left">
          <p className="text-light-200/80">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary">1. Introduction</h2>
            <p>Welcome to Value Hub ("Company", "we", "our", "us")! These Terms and Conditions ("Terms") govern your use of our website located at valuehub.com (together or individually "Service") operated by Value Hub. Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here.</p>
            
            <h2 className="text-2xl font-bold text-secondary">2. Intellectual Property Rights</h2>
            <p>Other than the content you own, under these Terms, Value Hub and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.</p>
            
            <h2 className="text-2xl font-bold text-secondary">3. Restrictions</h2>
            <p>You are specifically restricted from all of the following: publishing any Website material in any other media; selling, sublicensing and/or otherwise commercializing any Website material; publicly performing and/or showing any Website material; using this Website in any way that is or may be damaging to this Website; using this Website in any way that impacts user access to this Website; using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity; engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website.</p>

            <h2 className="text-2xl font-bold text-secondary">4. Your Content</h2>
            <p>In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Value Hub a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

            <h2 className="text-2xl font-bold text-secondary">5. No warranties</h2>
            <p>This Website is provided "as is," with all faults, and Value Hub express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

            <h2 className="text-2xl font-bold text-secondary">6. Limitation of liability</h2>
            <p>In no event shall Value Hub, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Value Hub, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

            <h2 className="text-2xl font-bold text-secondary">7. Governing Law & Jurisdiction</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.</p>
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

export default TermsPage;
