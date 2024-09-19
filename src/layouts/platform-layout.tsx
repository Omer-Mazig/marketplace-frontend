import { Outlet } from "react-router-dom";

import { MainNav } from "@/components/custom/main-nav";

export default function PlatformLayout() {
  return (
    <>
      <MainNav />
      <div className="container max-w-screen-2xl">
        <Outlet />
      </div>
    </>
  );
}
