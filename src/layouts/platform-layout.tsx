// Third-party libraries
import { Outlet } from "react-router-dom";

// Custom components
import { MainNav } from "@/components/custom/main-nav";
import { Footer } from "@/components/custom/footer";
import { LoginAlertDialog } from "@/components/custom/login-alert-dialog";

export default function PlatformLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="container max-w-screen-2xl flex-grow">
        <Outlet />
      </main>
      <Footer />
      <LoginAlertDialog />
    </div>
  );
}
