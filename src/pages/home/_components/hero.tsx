import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Welcome to MarketPalace
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Your one-stop shop for unique products
        </p>
        <div className="space-x-4">
          <Button
            asChild
            size="lg"
          >
            <Link to="platform/products">Explore Products</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-black"
          >
            <Link to="/sell">Start Selling</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
