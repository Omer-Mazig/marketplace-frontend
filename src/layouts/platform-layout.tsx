import { Outlet } from "react-router-dom";
import { MainNav } from "@/components/custom/main-nav";
import { Footer } from "@/components/custom/footer";

export default function PlatformLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="container max-w-screen-xl flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
