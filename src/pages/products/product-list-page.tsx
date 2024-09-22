import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { ProductCategory } from "@/enums/product-category.enum";
import { Product } from "@/types/products.types";

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 29.99,
    categories: [ProductCategory.ELECTRONICS, ProductCategory.OFFICE_SUPPLIES],
    stock: 150,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Gaming Keyboard",
    description: "Mechanical keyboard with RGB lighting",
    price: 89.99,
    categories: [ProductCategory.ELECTRONICS, ProductCategory.GAMING],
    stock: 75,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Water Bottle",
    price: 14.99,
    categories: [],
    stock: 500,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Running Shoes",
    description: "Lightweight shoes for running",
    price: 59.99,
    categories: [ProductCategory.SHOES, ProductCategory.FITNESS],
    stock: 120,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 49.99,
    categories: [ProductCategory.ELECTRONICS, ProductCategory.AUDIO],
    stock: 300,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Mac M2",
    price: 3000,
    categories: [ProductCategory.ELECTRONICS],
    stock: 1,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 24.99,
    categories: [ProductCategory.FITNESS],
    stock: 250,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Laptop Sleeve",
    price: 15.99,
    categories: [],
    stock: 400,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: "Coffee Mug",
    description: "Ceramic mug for hot beverages",
    price: 9.99,
    categories: [ProductCategory.KITCHEN],
    stock: 600,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    price: 69.99,
    categories: [ProductCategory.ELECTRONICS, ProductCategory.AUDIO],
    stock: 180,
    isNegotiable: false,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProductListPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, selectedCategory, priceRange);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    filterProducts(searchTerm, selectedCategory, value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterProducts(searchTerm, value as ProductCategory, priceRange);
  };

  const filterProducts = (term: string, category: string, price: number[]) => {
    const filtered = products.filter((product) => {
      const isCategoryMatch =
        category === "All" ||
        product.categories.includes(category as ProductCategory);
      return (
        product.name.toLowerCase().includes(term) &&
        isCategoryMatch &&
        product.price >= price[0] &&
        product.price <= price[1]
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search products..."
              onChange={handleSearch}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {Object.values(ProductCategory).map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Price Range</Label>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col"
              >
                <CardHeader>
                  <img
                    src={
                      product.imageUrl ||
                      `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                        product.name
                      )}`
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2">{product.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description
                      ? product.description
                      : "Nothing to say about this product"}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* <p className="text-sm">Stock: {product.stock}</p> */}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
