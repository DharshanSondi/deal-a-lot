
import { Navbar } from "@/components/ui/navbar";
import { AuthForm } from "@/components/auth/auth-form";
import { motion } from "framer-motion";

export default function AuthPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div 
              className="lg:col-span-2 flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <h1 className="text-3xl font-bold mb-4">Welcome to DiscountHub</h1>
                <p className="text-muted-foreground mb-6">
                  Sign in to access your saved deals, personalized recommendations, and more.
                </p>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97"/></svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Save on Every Purchase</h3>
                      <p className="text-muted-foreground text-sm">
                        Find the best deals across platforms like Amazon, Flipkart, and Meesho.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Track Price Changes</h3>
                      <p className="text-muted-foreground text-sm">
                        Get notified when prices drop on your favorite items.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Personalized Recommendations</h3>
                      <p className="text-muted-foreground text-sm">
                        Discover deals tailored to your shopping preferences.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  Quick & Easy Login
                </h4>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Just enter your email and password to sign in. No verification needed - start saving on your favorite products immediately!
                </p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="lg:col-span-3 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AuthForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
