
import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg dark:prose-invert mx-auto"
          >
            <h1 className="text-center">Privacy Policy</h1>
            <p>Last Updated: April 7, 2025</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to DiscountHub's Privacy Policy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Data</h3>
            <p>
              When you register for an account, we may collect the following types of information:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Password (stored securely)</li>
              <li>Profile information that you voluntarily provide</li>
            </ul>
            
            <h3>2.2 Usage Data</h3>
            <p>
              We also collect information about how you use our service:
            </p>
            <ul>
              <li>Products viewed</li>
              <li>Deals saved to your wishlist</li>
              <li>Search queries</li>
              <li>Interaction with features</li>
              <li>Device information (browser type, IP address, device type)</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes:
            </p>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To personalize your experience and show relevant deals</li>
              <li>To improve our website and services</li>
              <li>To communicate with you about your account or new features</li>
              <li>To detect and prevent fraudulent activities</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2>5. Third-Party Services</h2>
            <p>
              Our service may contain links to third-party websites or services that are not owned or controlled by DiscountHub. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2>7. International Data Transfers</h2>
            <p>
              Your information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
            </p>
            
            <h2>9. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data:
            </p>
            <ul>
              <li>The right to access the personal data we hold about you</li>
              <li>The right to rectify inaccurate personal data</li>
              <li>The right to request the deletion of your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal data</li>
            </ul>
            
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: discounthub.dev@gmail.com</li>
              <li>By phone: 8341164263</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
