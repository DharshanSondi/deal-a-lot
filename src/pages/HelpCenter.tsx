
import { Navbar } from "@/components/ui/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, HelpCircle, FileText, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does DiscountHub work?",
      answer: "DiscountHub is a platform that aggregates deals and discounts from multiple e-commerce platforms like Amazon, Flipkart, and Meesho. We use advanced algorithms to find the best deals and present them in one convenient place, helping you save time and money."
    },
    {
      question: "Is DiscountHub free to use?",
      answer: "Yes, DiscountHub is completely free to use. We don't charge any fees for finding deals or comparing prices across platforms."
    },
    {
      question: "How do I save deals to my wishlist?",
      answer: "To save deals to your wishlist, you need to create an account or sign in if you already have one. Once signed in, you can click the heart icon on any deal to save it to your wishlist. You can access your saved deals anytime from the Wishlist page."
    },
    {
      question: "Are the deals updated in real-time?",
      answer: "Yes, we strive to provide the most up-to-date deals from all supported platforms. Our system regularly checks for new deals and removes expired ones to ensure you always have access to active discounts."
    },
    {
      question: "How can I compare prices across different platforms?",
      answer: "You can use our Compare feature to see prices for the same or similar products across Amazon, Flipkart, and Meesho. Simply search for a product and click on the Compare option to see a side-by-side comparison of prices and features."
    },
    {
      question: "Can I get notifications for price drops?",
      answer: "Yes, after creating an account, you can set price alerts for specific products. We'll notify you via email when the price drops below your specified threshold."
    },
    {
      question: "How do I report an issue with a deal?",
      answer: "If you encounter any issues with a deal, such as an incorrect price or an expired deal still showing as active, please use our Contact Us page to report the problem. We appreciate your feedback as it helps us improve our service."
    },
    {
      question: "Does DiscountHub sell products directly?",
      answer: "No, DiscountHub does not sell products directly. We simply provide information about deals and redirect you to the respective e-commerce platforms to complete your purchase."
    },
    {
      question: "How do I create an account on DiscountHub?",
      answer: "Creating an account is simple. Click on the 'Login' button in the navigation bar, then select the 'Register' tab. Enter your name, email, and password, agree to the terms, and click 'Create Account'. You'll be instantly logged in and ready to use all features."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, go to the Login page and click on 'Forgot password?' link. Enter your email address, and we'll send you instructions to reset your password."
    },
    {
      question: "How secure is my information on DiscountHub?",
      answer: "We take security very seriously. Your password is encrypted and we use industry-standard security protocols to protect your data. We never share your personal information with third parties without your consent."
    }
  ];

  const filteredFaqs = searchQuery.trim() === "" 
    ? faqs 
    : faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to commonly asked questions and learn how to make the most of DiscountHub.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-10"
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="pl-10 py-6 text-base rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left font-medium py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 border border-border rounded-lg">
                <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any FAQs matching your search.
                </p>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/privacy-policy" className="block">
                <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <ShieldCheck className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Privacy Policy</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Learn about how we handle your data and privacy.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    View Policy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
              
              <Link to="/terms-of-service" className="block">
                <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <FileText className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Terms of Service</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Review our terms and conditions of use.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    View Terms
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
              
              <Link to="/contact-us" className="block">
                <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <Mail className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Can't find what you need? Reach out to our team.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
