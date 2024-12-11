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
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import AboutPage from "@/pages/about-page";
import TeamPage from "@/pages/vision-page";
import VisionPage from "@/pages/team-page";
import UserInfoPage from "@/pages/user-profile/user-info/user-info-page";
import UserSettingsPage from "@/pages/user-profile/user-settings/user-settings-page";
import UserProductsPage from "@/pages/user-profile/user-products/user-products-page";
import UserWishlistPage from "@/pages/user-profile/user-wishlist/user-wishlist-page";
import ProductListPage from "@/pages/products/product-list-page";
import ProductDetails from "@/pages/product-details/product-details-page";
import NewProductPage from "@/pages/new-product-page";

// Custom providers
import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";

import { io } from "socket.io-client";

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
        path: "new-product",
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
  // const { loggedInUser } = useAuth();

  // const socket = io("http://localhost:3000", {
  //   query: { userId: loggedInUser?.id }, // Pass logged-in user's ID
  // });

  // useEffect(() => {
  //   socket.on("notification", (data) => {
  //     console.log("notification", data);
  //   });
  // }, []);
  return <RouterProvider router={router} />;
}

export default App;
