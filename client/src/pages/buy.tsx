import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Phone, Hash, Loader2, Package, Star, Truck, CreditCard } from "lucide-react";

export default function Buy() {
  const { toast } = useToast();

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      quantity: 1,
    },
  });

  const submitOrder = useMutation({
    mutationFn: async (data: InsertOrder) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. We'll contact you shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertOrder) => {
    submitOrder.mutate(data);
  };

  const benefits = [
    { icon: Package, text: "Free packaging" },
    { icon: Truck, text: "Fast delivery" },
    { icon: Star, text: "Premium quality" },
    { icon: CreditCard, text: "Secure payment" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-buy-title">
              Purchase Our Product
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto" data-testid="text-buy-description">
              Complete your order in just a few simple steps. Fast, secure, and hassle-free.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50"
                data-testid={`badge-benefit-${index}`}
              >
                <benefit.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <Card className="shadow-lg border-border/50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold" data-testid="text-order-form-title">
                Place Your Order
              </CardTitle>
              <CardDescription className="text-base">
                Fill in your details and we'll process your order immediately.
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
                            data-testid="input-order-name"
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
                            data-testid="input-order-phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => {
                      const numericValue = typeof field.value === 'number' ? field.value : parseInt(String(field.value)) || 1;
                      return (
                        <FormItem>
                          <FormLabel className="text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                            <Hash className="w-4 h-4 text-muted-foreground" />
                            Number of Products <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  if (numericValue > 1) {
                                    field.onChange(numericValue - 1);
                                  }
                                }}
                                disabled={numericValue <= 1}
                                data-testid="button-decrease-quantity"
                              >
                                <span className="text-lg font-medium">-</span>
                              </Button>
                              <Input
                                type="number"
                                min={1}
                                className="h-12 text-center w-24"
                                data-testid="input-order-quantity"
                                value={numericValue}
                                onChange={(e) => {
                                  const parsed = parseInt(e.target.value);
                                  field.onChange(isNaN(parsed) || parsed < 1 ? 1 : parsed);
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  field.onChange(numericValue + 1);
                                }}
                                data-testid="button-increase-quantity"
                              >
                                <span className="text-lg font-medium">+</span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4 text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">${((form.watch("quantity") || 1) * 99.99).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 text-muted-foreground">
                      <span>Shipping</span>
                      <span className="font-medium text-primary">FREE</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                      <span>Total</span>
                      <span data-testid="text-total-price">${((form.watch("quantity") || 1) * 99.99).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={submitOrder.isPending}
                    data-testid="button-buy-now"
                  >
                    {submitOrder.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Buy Now"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Secure checkout powered by trusted payment partners.
            </p>
            <p className="text-xs text-muted-foreground">
              By placing an order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
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
