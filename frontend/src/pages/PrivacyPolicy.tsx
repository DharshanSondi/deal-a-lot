
import { Navbar } from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
            className="bg-card shadow-sm rounded-xl p-6 md:p-8"
          >
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
              <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: April 10, 2025</p>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                DiscountHub ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website, including any other media form, media channel, mobile website, 
                or mobile application related or connected thereto (collectively, the "Site").
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                please do not access the site.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect 
                on the Site includes:
              </p>
              
              <h3>Personal Data</h3>
              <p>
                When you register for an account, sign up for newsletters, respond to surveys, contact us, 
                or participate in other activities on our Site, we may collect personally identifiable information, 
                such as your:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Profile photo</li>
              </ul>
              
              <h3>Derivative Data</h3>
              <p>
                Information our servers automatically collect when you access the Site, such as your IP address, 
                browser type, operating system, access times, and the pages you have viewed directly before and 
                after accessing the Site.
              </p>
              
              <h3>Financial Data</h3>
              <p>
                Financial information, such as data related to your payment method (e.g., valid credit card number, 
                card brand, expiration date) that we may collect when you purchase products or services from our Site. 
                We store only very limited, if any, financial information that we collect.
              </p>
              
              <h2>Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, 
                and customized experience. Specifically, we may use information collected about you via the 
                Site to:
              </p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Compile anonymous statistical data and analysis for use internally.</li>
                <li>Email you regarding your account or order.</li>
                <li>Enable user-to-user communications.</li>
                <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                <li>Increase the efficiency and operation of the Site.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Notify you of updates to the Site.</li>
                <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
                <li>Process transactions.</li>
                <li>Resolve disputes and troubleshoot problems.</li>
                <li>Respond to product and customer service requests.</li>
                <li>Send you a newsletter.</li>
              </ul>
              
              <h2>Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. 
                Your information may be disclosed as follows:
              </p>
              
              <h3>By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary to respond to legal process, 
                to investigate or remedy potential violations of our policies, or to protect the rights, property, 
                and safety of others, we may share your information as permitted or required by any applicable law, 
                rule, or regulation.
              </p>
              
              <h3>Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform services for us or on our behalf, 
                including payment processing, data analysis, email delivery, hosting services, customer service, 
                and marketing assistance.
              </p>
              
              <h3>Marketing Communications</h3>
              <p>
                With your consent, or with an opportunity for you to withdraw consent, we may share your 
                information with third parties for marketing purposes, as permitted by law.
              </p>
              
              <h2>Tracking Technologies</h2>
              <p>
                We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site 
                to help customize the Site and improve your experience. For more information on how we use cookies, 
                please refer to our Cookie Policy.
              </p>
              
              <h2>Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal 
                information. While we have taken reasonable steps to secure the personal information you provide to us, 
                please be aware that despite our efforts, no security measures are perfect or impenetrable, and no 
                method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p>
                DiscountHub<br />
                Email: contact@discounthub.com<br />
                Phone: 8341164263<br />
                Address: Hyderabad, India
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
