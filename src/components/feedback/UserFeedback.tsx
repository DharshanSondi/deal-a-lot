
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { StarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const UserFeedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackText.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast.error('You must be logged in to submit feedback');
        setIsSubmitting(false);
        return;
      }
      
      const userId = sessionData.session.user.id;
      const email = sessionData.session.user.email || '';
      
      const { error } = await supabase.from('user_feedback').insert({
        user_id: userId,
        feedback_text: feedbackText,
        rating,
        email
      });
      
      if (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback');
      } else {
        toast.success('Thank you for your feedback!');
        setFeedbackText('');
        setRating(0);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Share Your Feedback</h3>
      
      <form onSubmit={handleSubmitFeedback} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
              >
                <StarIcon
                  className={`h-8 w-8 transition-all ${
                    star <= (hoveredStar || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {rating ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="feedback">Your Feedback</Label>
          <Textarea
            id="feedback"
            placeholder="Tell us what you think about DiscountHub..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Your feedback helps us improve our service
          </p>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting || !feedbackText.trim() || rating === 0}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
};

export default UserFeedback;
