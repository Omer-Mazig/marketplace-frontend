// React
import { useState } from "react";

// Icons
import { Check, X } from "lucide-react";

// UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    id: "standard",
    name: "Standard",
    price: "$9.99",
    description: "Perfect for individuals and small teams",
    features: [
      { name: "Up to 5 users", included: true },
      { name: "5GB storage", included: true },
      { name: "Basic support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$29.99",
    description: "Ideal for growing businesses",
    features: [
      { name: "Up to 20 users", included: true },
      { name: "50GB storage", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "$99.99",
    description: "For enterprises seeking premium features",
    features: [
      { name: "Unlimited users", included: true },
      { name: "500GB storage", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom integrations", included: true },
    ],
  },
];

export function UpgradePlanList() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1].id);

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`transition-all duration-300 ease-in-out ${
              selectedPlan === plan.id
                ? "border-primary shadow-lg"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-sm">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center my-4">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center"
                  >
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
