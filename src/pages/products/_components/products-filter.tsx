import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { ProductCategory } from "@/enums/product-category.enum";
import { Button } from "@/components/ui/button";

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 9999]);

  useEffect(() => {
    // Initialize state from search params
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 9999;

    setSearchTerm(search);
    setSelectedCategory(category);
    setPriceRange([minPrice, maxPrice]);
    handleFilterSubmit();
  }, [searchParams]);

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
    setSearchParams(newSearchParams);
  };

  return (
    <div>
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
          value={priceRange} // Use value instead of defaultValue for controlled component
          onValueChange={handlePriceRangeChange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="flex justify-between gap-2">
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
