
import { Navbar } from "@/components/ui/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

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
              Find answers to frequently asked questions and learn how to make the most of DiscountHub.
            </p>
            
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search help articles..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I save deals to my wishlist?</AccordionTrigger>
                    <AccordionContent>
                      To save a deal to your wishlist, simply click on the heart icon on any deal card. You'll need to be logged in to save deals. You can view all your saved deals in the "Wishlist" section accessible from the navigation menu.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Do you offer price alerts?</AccordionTrigger>
                    <AccordionContent>
                      Yes! You can set up price alerts for any product you're interested in. When the price drops below your target, we'll send you a notification. To set up a price alert, view a product and click on "Track Price" button.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I filter deals by platform?</AccordionTrigger>
                    <AccordionContent>
                      On the deals page, you'll find filter options on the left side. You can filter by platform (Amazon, Flipkart, Meesho), discount percentage, price range, categories, and more to find exactly what you're looking for.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are the discounts shown real-time?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we constantly update our deals to ensure the prices and discounts shown are accurate and up-to-date. However, prices on e-commerce websites can change quickly, so we recommend always checking the final price before completing your purchase.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I change my account settings?</AccordionTrigger>
                    <AccordionContent>
                      After logging in, click on your profile icon in the navigation bar and select "Profile." From there, you can update your personal information, change your password, manage notification preferences, and adjust other account settings.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-3">Still need help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is here to help!
                </p>
                <Button className="w-full" asChild>
                  <Link to="/contact-us">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-3">Popular Topics</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-primary hover:underline">How to compare products</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-primary hover:underline">Creating a user account</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-primary hover:underline">Understanding coupon codes</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-primary hover:underline">Getting personalized recommendations</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-primary hover:underline">Using deal filters effectively</a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
