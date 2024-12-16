import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const products = [
  {
    id: 1,
    name: "Vintage Camera",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Handmade Pottery",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Eco-friendly Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export function PopularProducts() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className={`transform transition-all duration-500 ${
                isIntersecting
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
