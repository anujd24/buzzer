import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertComplaintSchema, type InsertComplaint } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, Shield, Zap, HeartHandshake, User, Phone, MessageSquare, Loader2 } from "lucide-react";

export default function Home() {
  const { toast } = useToast();

  const form = useForm<InsertComplaint>({
    resolver: zodResolver(insertComplaintSchema),
    defaultValues: {
      name: "",
      phone: "",
      complaint: "",
    },
  });

  const submitComplaint = useMutation({
    mutationFn: async (data: InsertComplaint) => {
      const response = await apiRequest("POST", "/api/complaints", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Complaint Submitted",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertComplaint) => {
    submitComplaint.mutate(data);
  };

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Built with the finest materials ensuring durability and longevity.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized for speed and efficiency in every aspect.",
    },
    {
      icon: HeartHandshake,
      title: "24/7 Support",
      description: "Our dedicated team is always ready to assist you.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 10,000+ customers</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight" data-testid="text-hero-title">
              Discover Our
              <span className="text-primary"> Premium </span>
              Product
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-description">
              Experience excellence with our flagship product. Crafted with precision, 
              designed for performance, and built to exceed your expectations. Join thousands 
              of satisfied customers who have made the smart choice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-base font-medium px-8" data-testid="button-get-started">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="text-base font-medium px-8" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering the best experience for our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <Card className="shadow-lg border-border/50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold" data-testid="text-complaint-title">
                Submit Your Complaint
              </CardTitle>
              <CardDescription className="text-base">
                We value your feedback. Let us know how we can improve.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 md:px-10 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Your Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="h-12"
                            data-testid="input-complaint-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          Phone Number <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            type="tel"
                            className="h-12"
                            data-testid="input-complaint-phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complaint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          Your Complaint <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your complaint in detail..."
                            className="min-h-32 resize-none"
                            data-testid="input-complaint-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-8 h-12 text-base font-medium"
                    disabled={submitComplaint.isPending}
                    data-testid="button-submit-complaint"
                  >
                    {submitComplaint.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Complaint"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} ProductCo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
