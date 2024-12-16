import { MainHeader } from "@/components/main/main-header/main-header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <footer>Main Layout Footer</footer>
    </div>
  );
}

export default MainLayout;
