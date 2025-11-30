import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    pricePeriod: "",
    description: "Get started with our basic features and a limited number of interviews.",
    features: [
      "5 interviews per month",
      "Basic AI feedback",
      "Limited question library",
      "Standard support",
    ],
    buttonText: "Your Current Plan",
    buttonVariant: "outline",
  },
  {
    name: "Premium",
    price: "₹149",
    pricePeriod: "/ month",
    description: "Unlock unlimited interviews and advanced, personalized feedback.",
    features: [
      "Unlimited interviews",
      "Advanced AI feedback (tone, filler words)",
      "Full question library",
      "Personalized learning paths",
      "Priority email support",
    ],
    buttonText: "Upgrade to Premium",
    buttonVariant: "default",
  },
  {
    name: "Pro",
    price: "₹249",
    pricePeriod: "/ month",
    description: "Master your interviews with our complete suite of professional tools.",
    features: [
      "All Premium features",
      "AI Resume Analyzer",
      "AI Resume Maker",
      "Body language analysis",
      "Dedicated support",
    ],
    buttonText: "Get Started with Pro",
    buttonVariant: "default",
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Choose Your Plan</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select the perfect plan to accelerate your career goals.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === 'Premium' ? 'border-primary shadow-lg' : ''}>
            <CardHeader className="pb-4">
              {plan.name === 'Premium' && (
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Most Popular</div>
              )}
              <CardTitle className="text-3xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              <div>
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.pricePeriod && (
                    <span className="text-muted-foreground">{plan.pricePeriod}</span>
                )}
              </div>
              <ul className="space-y-4 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" variant={plan.buttonVariant as any} className="w-full">
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
