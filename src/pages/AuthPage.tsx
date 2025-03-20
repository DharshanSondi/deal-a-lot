
import { Navbar } from "@/components/ui/navbar";
import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="animate-slide-in">
                <h1 className="text-3xl font-bold mb-4">Welcome to DiscountHub</h1>
                <p className="text-muted-foreground mb-6">
                  Sign in to access your saved deals, personalized recommendations, and more.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97"/></svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Save on Every Purchase</h3>
                      <p className="text-muted-foreground text-sm">
                        Find the best deals across platforms like Amazon, Flipkart, and Meesho.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Track Price Changes</h3>
                      <p className="text-muted-foreground text-sm">
                        Get notified when prices drop on your favorite items.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Personalized Recommendations</h3>
                      <p className="text-muted-foreground text-sm">
                        Discover deals tailored to your shopping preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 flex justify-center items-center animate-fade-in">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
