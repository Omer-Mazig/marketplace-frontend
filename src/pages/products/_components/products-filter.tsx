// Third-party libraries
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

// UI components
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
import { Button } from "@/components/ui/button";

// Enums
import { ProductCategory } from "@/enums/product-category.enum";

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 9999]);

  useEffect(() => {
    // Initialize state from search params (only on mount)
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 9999;

    setSearchTerm(search);
    setSelectedCategory(category);
    setPriceRange([minPrice, maxPrice]);

    // We no longer trigger handleFilterSubmit here to avoid redundant param updates
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const reset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange([0, 9999]);

    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
  };

  const handleFilterSubmit = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search", searchTerm);
    newSearchParams.set("category", selectedCategory);
    newSearchParams.set("minPrice", priceRange[0].toString());
    newSearchParams.set("maxPrice", priceRange[1].toString());

    // Only update the search params if there's a change
    if (
      searchTerm !== searchParams.get("search") ||
      selectedCategory !== searchParams.get("category") ||
      priceRange[0].toString() !== searchParams.get("minPrice") ||
      priceRange[1].toString() !== searchParams.get("maxPrice")
    ) {
      setSearchParams(newSearchParams);
    }
  };

  return (
    <div className="sticky top-[82px]">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          onValueChange={handleCategoryChange}
          value={selectedCategory}
        >
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
          max={9999}
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

      <div className="flex flex-col xs:flex-row lg:flex-col gap-2">
        <Button onClick={handleFilterSubmit}>Apply Filters</Button>
        <Button
          onClick={reset}
          variant="outline"
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}
