import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import PlatformLayout from "./layouts/platform-layout";
import AuthLayout from "./layouts/auth-layout";

import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AboutPage from "./pages/about-page";

import { useAuth } from "./providers/auth-provider";
import TeamPage from "./pages/vision-page";
import VisionPage from "./pages/team-page";
import UserProfileLayout from "./pages/user-profile/user-profile-layout";
import UserInfoPage from "./pages/user-profile/user-info/user-info-page";
import UserSettingsPage from "./pages/user-profile/user-settings/user-settings-page";
import UserProductsPage from "./pages/user-profile/user-products/user-products-page";
import UserWishlistPage from "./pages/user-profile/user-wishlist/user-wishlist-page";
import ProductListPage from "./pages/products/product-list-page";
import ProductDetails from "./pages/product-details/product-details-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PlatformLayout />,
    children: [
      {
        index: true,
        element: <div>home</div>,
      },

      {
        path: "about",
        element: <AboutPage />,
        children: [
          {
            path: "team",
            element: <TeamPage />,
          },
          {
            path: "vision",
            element: <VisionPage />,
          },
        ],
      },
      {
        path: "contact",
        element: <div>Contact</div>,
      },
      {
        path: "services",
        element: <div>Services</div>,
      },
      {
        path: "products",
        element: <ProductListPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "user-profile",
        element: (
          <ProtectedRoute>
            <UserProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true, // for /user-profile - navigate to info
            element: <Navigate to="info" />,
          },
          {
            path: "info", // changed to relative path
            element: <UserInfoPage />,
          },
          {
            path: "settings", // changed to relative path
            element: <UserSettingsPage />,
          },
          {
            path: "products", // changed to relative path
            element: <UserProductsPage />,
          },
          {
            path: "wishlist", // changed to relative path
            element: <UserWishlistPage />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [
      {
        path: "login",

        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
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
