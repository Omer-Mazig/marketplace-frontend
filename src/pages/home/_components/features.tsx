import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ShoppingBag, Heart, DollarSign, Users } from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Wide Product Range",
    description: "From handmade crafts to tech gadgets",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save your favorite items for later",
  },
  {
    icon: DollarSign,
    title: "Competitive Prices",
    description: "Great deals from sellers worldwide",
  },
  {
    icon: Users,
    title: "User Community",
    description: "Connect with buyers and sellers",
  },
];

export function Features() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose MarketPalace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 ${
                isIntersecting
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
