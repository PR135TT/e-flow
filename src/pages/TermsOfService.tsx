
import { Shell } from "@/components/Shell";

const TermsOfService = () => {
  return (
    <Shell>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg mb-6">
              Welcome to E-Flow! These Terms of Service ("Terms") govern your use of our web app, 
              E-Flow ("Platform"), which facilitates renting, buying, and displaying real estate properties. 
              By accessing or using E-Flow, you agree to comply with and be bound by these Terms. 
              If you do not agree, please do not use our Platform.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Eligibility</h2>
            <p>
              By using E-Flow, you confirm that you are at least 18 years old and legally capable of entering into binding agreements.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services Provided</h2>
            <p>
              E-Flow connects users with property owners, agents, and other individuals seeking to rent, buy, or display real estate. 
              We are an intermediary and do not own, lease, or sell properties directly.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and truthful information when creating your account or listing a property.</li>
              <li>Comply with all applicable laws, regulations, and industry standards in your use of E-Flow.</li>
              <li>Refrain from using E-Flow for fraudulent, abusive, or harmful activities.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, and materials on E-Flow are protected by copyright and other intellectual property laws. 
              You may not use, reproduce, or distribute any content from E-Flow without prior written consent from us.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimer of Liability</h2>
            <p>
              E-Flow does not guarantee the accuracy, reliability, or availability of property listings or third-party information. 
              We are not responsible for any losses or damages resulting from transactions made through the Platform.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Account Suspension and Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms, 
              engage in unlawful activities, or misuse the Platform.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Privacy</h2>
            <p>
              Your privacy matters to us. Please refer to our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> to 
              understand how we handle your personal data.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We may update these Terms periodically. Continued use of E-Flow after such updates 
              constitutes your acceptance of the revised Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>
              For any questions or concerns about these Terms, please reach out to us:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Phone:</strong> +2348088667744</li>
              <li><strong>Email:</strong> euronLabs99@gmail.com</li>
            </ul>
            
            <p className="text-sm text-gray-500 mt-10">
              Last updated: April 9, 2025
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default TermsOfService;
