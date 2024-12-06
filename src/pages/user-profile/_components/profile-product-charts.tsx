// Third-party libraries
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

// Types
import { Product } from "@/types/products.types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface ProfileProductChartsProps {
  products: Product[];
}

const ProfileProductCharts = ({ products }: ProfileProductChartsProps) => {
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
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
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
            {categoryChartData.map((_entry, index) => (
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
  );
};

export default ProfileProductCharts;
