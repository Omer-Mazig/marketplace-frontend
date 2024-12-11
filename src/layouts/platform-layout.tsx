// Third-party libraries
import { Outlet } from "react-router-dom";

// Custom components
import { MainNav } from "@/components/custom/main-nav";
import { Footer } from "@/components/custom/footer";
import { LoginAlertDialog } from "@/components/custom/login-alert-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/app-sidebar";

export default function PlatformLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <SidebarProvider>
        <AppSidebar />
        <main className="container max-w-screen-2xl flex-grow">
          <Outlet />
        </main>
      </SidebarProvider>
      <Footer />
      <LoginAlertDialog />
    </div>
  );
}
