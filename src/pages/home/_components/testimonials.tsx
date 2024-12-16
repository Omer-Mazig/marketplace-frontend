import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Buyer",
    content:
      "I love the variety of products on MarketPalace. It's my go-to place for unique gifts!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "John D.",
    role: "Seller",
    content:
      "As a small business owner, MarketPalace has been a game-changer for reaching new customers.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily R.",
    role: "Buyer",
    content:
      "The wishlist feature is fantastic! It helps me keep track of all the items I want to buy.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export function Testimonials() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 ${
                isIntersecting
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
