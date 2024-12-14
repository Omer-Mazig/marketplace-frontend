// Third-party libraries
import { Outlet } from "react-router-dom";

// Custom components
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/app-sidebar";
import { LoginAlertDialog } from "@/pages/auth/_components/login-alert-dialog";
import { AppHeader } from "@/components/app/app-header";
import { AppFooter } from "@/components/app/app-footer";

export default function PlatformLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col max-w-screen-2xl flex-grow">
          <AppHeader />
          <main className="container flex-grow">
            <Outlet />
          </main>
          <AppFooter />
        </div>
      </SidebarProvider>
      <LoginAlertDialog />
    </div>
  );
}
