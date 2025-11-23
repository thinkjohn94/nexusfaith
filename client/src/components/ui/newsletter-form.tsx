import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
    setEmail("");
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-primary/10 p-8 text-center border border-primary/20">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">You're subscribed!</h3>
        <p className="text-muted-foreground">
          Thanks for joining. Look out for our next update.
        </p>
        <Button variant="ghost" className="mt-4" onClick={() => setIsSuccess(false)}>
          Reset form
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-muted p-8 md:p-12">
      <div className="mx-auto max-w-xl text-center">
        <Mail className="mx-auto h-10 w-10 text-primary mb-4" />
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          Join the Conversation
        </h3>
        <p className="text-muted-foreground mb-8">
          Get the latest essays, videos, and updates delivered straight to your inbox. 
          No spam, just substance.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-background"
            disabled={isLoading}
          />
          <Button type="submit" size="lg" className="h-12" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
