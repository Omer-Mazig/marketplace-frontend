import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUserProfileDataQuery } from "@/hooks/useUserProfileDataQuery";
import { UserProductsSkeleton } from "./user-products-page-skeleton";
import Error from "@/components/custom/error";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Product } from "@/services/user.service";
import { ProductCategory } from "@/enums/product-category.enum";

function UserProductsPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileDataQuery();

  if (isLoading) return <UserProductsSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Mouse",
      price: 29.99,
      categories: [
        ProductCategory.ELECTRONICS,
        ProductCategory.OFFICE_SUPPLIES,
      ],
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

  // Prepare data for charts
  const viewCountData = products.map((product) => ({
    name: product.name,
    views: product.viewCount,
  }));

  const stockData = products.map((product) => ({
    name: product.name,
    stock: product.stock,
  }));

  const categoryData = products.reduce((acc, product) => {
    product.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as any); // add type safe

  const categoryChartData = Object.entries(categoryData).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Products</CardTitle>
        <CardDescription>Manage the products you've listed.</CardDescription>
      </CardHeader>
      <CardContent>
        {products.length ? (
          <ul className="space-y-4">
            {products.map((product) => {
              return (
                <li
                  key={product.id}
                  className="text-center 3xs:text-start flex flex-col md:flex-row justify-between 3xs:items-start md:items-center border-b pb-2"
                >
                  <span className="mb-2 md:mb-0">{product.name}</span>
                  <div className="flex flex-col 3xs:flex-row justify-center flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="justify-center"
                    >
                      ${product.price?.toFixed(2)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>You have no products</p>
        )}
        <div className="flex items-center mt-4">
          <Button className="w-full md:w-auto">Add New Product</Button>
        </div>

        <Separator className="my-8" />

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Product Views</h3>
            <BarChart
              width={600}
              height={300}
              data={viewCountData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="views"
                fill="#8884d8"
              />
            </BarChart>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Product Stock</h3>
            <BarChart
              width={600}
              height={300}
              data={stockData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="stock"
                fill="#82ca9d"
              />
            </BarChart>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Product Categories</h3>
            <PieChart
              width={400}
              height={400}
            >
              <Pie
                data={categoryChartData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserProductsPage;
