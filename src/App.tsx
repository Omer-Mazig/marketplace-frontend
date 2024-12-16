// React Router
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";

// Custom layouts
import PlatformLayout from "@/layouts/platform-layout";
import AuthLayout from "@/layouts/auth-layout";
import UserProfileLayout from "@/pages/user-profile/user-profile-layout";

// Custom pages
import ContactPage from "./pages/contact/contact-page";
import HomePage from "./pages/home/home-page";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import AboutPage from "@/pages/about/about-page";
import VisionPage from "@/pages/about/vision-page";
import TeamPage from "@/pages/about/team-page";
import UserInfoPage from "@/pages/user-profile/user-info/user-info-page";
import UserSettingsPage from "@/pages/user-profile/user-settings/user-settings-page";
import UserProductsPage from "@/pages/user-profile/user-products/user-products-page";
import UserWishlistPage from "@/pages/user-profile/user-wishlist/user-wishlist-page";
import NewProductPage from "@/pages/products/new-product/new-product-page";
import ProductListPage from "@/pages/products/product-list/product-list-page";
import ProductDetails from "@/pages/products/product-details/product-details-page";
import FeaturedProductsPage from "./pages/products/featured-products/featured-products-page";

// Custom providers
import { useAuth } from "@/providers/auth-provider";
import MainLayout from "./layouts/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
        children: [
          { path: "team", element: <TeamPage /> },
          { path: "vision", element: <VisionPage /> },
        ],
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/platform",
    element: <PlatformLayout />,
    children: [
      {
        path: "products",
        element: <FeaturedProductsPage />,
      },
      {
        path: "products/category/:category",
        element: <ProductListPage />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/new-product",
        element: (
          <ProtectedRoute>
            <NewProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <ProtectedRoute>
            <UserProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="info" /> },
          { path: "info", element: <UserInfoPage /> },
          { path: "settings", element: <UserSettingsPage /> },
          { path: "products", element: <UserProductsPage /> },
          { path: "wishlist", element: <UserWishlistPage /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();
  const location = useLocation();

  if (loggedInUser === undefined) {
    return null;
  }

  if (!loggedInUser) {
    // Redirect to login page and save the current location as the "from" state
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

function AuthRoutes({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();
  const location = useLocation();

  if (loggedInUser === undefined) {
    return null;
  }

  // if the user is logged in, redirect to the previous route or home ("/")
  if (loggedInUser) {
    return (
      <Navigate
        to={location.state?.from?.pathname || "/"}
        replace
      />
    );
  }

  return children;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
