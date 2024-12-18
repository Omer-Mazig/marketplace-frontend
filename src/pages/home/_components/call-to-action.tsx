import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CallToAction() {
  return (
    <section className="py-20 bg-indigo-700 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-xl mb-8">
          Join MarketPalace today and discover amazing products!
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
        >
          <Link to="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  );
}
