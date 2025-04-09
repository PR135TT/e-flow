
import { Shell } from "@/components/Shell";

const PrivacyPolicy = () => {
  return (
    <Shell>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg mb-6">
              At E Flow, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>We collect information when you register on our site, sign in with a social authentication provider such as Google, or interact with our platform. This information may include:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Personal identifiers such as your name and email address</li>
              <li>Contact information such as your phone number and location</li>
              <li>Profile information related to your user type and preferences</li>
              <li>Usage data and interaction with our platform</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates or security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Authentication</h2>
            <p>
              Our service allows for authentication through third-party providers such as Google. When you choose to sign in using a third-party provider, we may receive certain profile information about you from your social media provider. The information we receive depends on the settings and privacy policies of the provider you use.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt out of certain data uses</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie Policy</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our platform. These technologies allow us to remember your preferences, understand how you use our service, and improve functionality.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Revised" date at the top of this page. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-10">
              <strong>Email:</strong> privacy@eflow.com
            </p>
            
            <p className="text-sm text-gray-500 mt-10">
              Last updated: April 9, 2025
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default PrivacyPolicy;
