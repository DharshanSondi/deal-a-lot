
import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface TourStep {
  title: string;
  description: string;
  target: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to DiscountHub!',
    description: 'Discover the best deals across multiple e-commerce platforms in one place.',
    target: 'body',
    placement: 'bottom',
  },
  {
    title: 'Explore Deals',
    description: 'Browse the latest discounts and offers from your favorite stores.',
    target: 'nav a[href="/deals"]',
    placement: 'bottom',
  },
  {
    title: 'Compare Products',
    description: 'Compare prices across different platforms to find the best deal.',
    target: 'nav a[href="/compare"]',
    placement: 'bottom',
  },
  {
    title: 'Save Your Favorites',
    description: 'Add deals to your wishlist to track them or view them later.',
    target: 'a[href="/wishlist"]',
    placement: 'bottom',
  },
];

export function TourGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Check if tour has been completed before
    const tourCompleted = localStorage.getItem('tourCompleted');
    
    if (!tourCompleted) {
      // Wait for page to fully load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const step = tourSteps[currentStep];
    const el = document.querySelector(step.target) as HTMLElement;
    
    if (el) {
      setTargetElement(el);
      
      const updatePosition = () => {
        const rect = el.getBoundingClientRect();
        
        let top = 0;
        let left = 0;
        
        switch (step.placement) {
          case 'top':
            top = rect.top - 10;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + 10;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - 10;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + 10;
            break;
        }
        
        // Ensure the tooltip is visible on screen
        if (step.target === 'body') {
          top = window.innerHeight / 2;
          left = window.innerWidth / 2;
        }
        
        setPosition({ top, left });
      };
      
      updatePosition();
      
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isOpen, currentStep]);
  
  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem('tourCompleted', 'true');
  };
  
  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem('tourCompleted', 'true');
  };
  
  if (!isOpen) return null;
  
  const step = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={handleSkip} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-50 max-w-sm p-4 bg-background rounded-lg shadow-elegant glass border-0"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: 'translate(-50%, 0)',
            }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2" 
              onClick={handleSkip}
            >
              <X size={16} />
            </Button>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {tourSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1.5 w-7 rounded-full ${
                      index === currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleNext}
                  className="flex items-center"
                >
                  {isLastStep ? (
                    <>
                      Finish
                      <CheckCircle className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
