import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Phone, Search, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse",
    description: "Explore our wide range of unique products",
  },
  {
    icon: Phone,
    title: "Connect",
    description: "Connect with the seller and close a deal",
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Receive your items at your doorstep",
  },
];

export function HowItWorks() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center transform transition-all duration-500 ${
                isIntersecting
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-indigo-100 rounded-full p-6 mb-4">
                <step.icon className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
