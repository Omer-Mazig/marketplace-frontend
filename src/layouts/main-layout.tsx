import { AppFooter } from "@/components/app/app-footer/app-footer";
import { MainHeader } from "@/components/main/main-header/main-header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

export default MainLayout;
