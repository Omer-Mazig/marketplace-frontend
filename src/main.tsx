// React and React DOM
import React from "react";
import ReactDOM from "react-dom/client";

// Third-party libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Custom providers
import { AuthProvider } from "@/providers/auth-provider.tsx";
import { UpgradePlanDialogProvider } from "./providers/upgrade-plan-dialog-provider.tsx";
import { BreadcrumpProvider } from "./providers/breadcrump-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

// Global styles
import "./index.css";

// Main app component
import App from "./App.tsx";

const queryClient = new QueryClient();

// TODO: consider replaing toast to 'sonner'
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UpgradePlanDialogProvider>
          <BreadcrumpProvider>
            <App />
          </BreadcrumpProvider>
        </UpgradePlanDialogProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
