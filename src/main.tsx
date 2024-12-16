// React and React DOM
import React from "react";
import ReactDOM from "react-dom/client";

// Third-party libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Custom providers
import { AuthProvider } from "@/providers/auth-provider.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { UpgradePlanDialogProvider } from "./providers/upgrade-plan-dialog-provider.tsx";

// Custom components
import { Toaster } from "@/components/ui/toaster.tsx";

// Global styles
import "./index.css";

// Main app component
import App from "./App.tsx";
import { BreadcrumpProvider } from "./providers/breadcrump-provider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <UpgradePlanDialogProvider>
            <BreadcrumpProvider>
              <App />
            </BreadcrumpProvider>
          </UpgradePlanDialogProvider>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
