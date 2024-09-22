import { useSearchParams } from "react-router-dom";

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

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("search", event.target.value);
    setSearchParams(newSearchParams);
  };

  const handleCategoryChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("category", value);
    setSearchParams(newSearchParams);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("minPrice", value[0].toString());
    newSearchParams.set("maxPrice", value[1].toString());
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search products..."
          onChange={handleSearchChange}
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
          defaultValue={[0, 1000]}
          onValueChange={handlePriceRangeChange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2">
          <span>${searchParams.get("minPrice") || 0}</span>
          <span>${searchParams.get("maxPrice") || 1000}</span>
        </div>
      </div>
    </div>
  );
}
