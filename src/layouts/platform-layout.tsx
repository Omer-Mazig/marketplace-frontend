import { Outlet } from "react-router-dom";

import { MainNav } from "@/components/custom/main-nav";

export default function PlatformLayout() {
  return (
    <>
      <MainNav />
      <main className="container max-w-screen-xl">
        <Outlet />
      </main>
    </>
  );
}
