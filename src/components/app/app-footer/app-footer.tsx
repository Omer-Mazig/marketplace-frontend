// React Router
import { Link } from "react-router-dom";

// Icons
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

// UI components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AppFooter() {
  return (
    <footer className="container bg-sidebar text-muted-foreground py-4 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="mb-4">
              We're a marketplace where you can buy and sell unique products.
              Join our community of creative sellers and savvy buyers!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:underline"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="hover:underline"
                >
                  Sell Your Product
                </Link>
              </li>
              <li>
                <Link
                  to="/saved"
                  className="hover:underline"
                >
                  Saved Items
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:underline"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:underline"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:underline"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
            <p className="mb-4">
              Stay updated with our latest products and offers!
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center 3xs:flex-row 3xs:justify-between">
            <p>&copy; 2024 Marketplace. All rights reserved.</p>
            <p className="mt-4 3xs:mt-0">
              Made with{" "}
              <Heart
                className="inline-block text-primary"
                size={16}
              />{" "}
              by Omer Mazig
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
