import { Outlet } from "react-router-dom";
import ProfileTabLinks from "./_components/profile-tab-links";

function UserProfileLayout() {
  return (
    <div className="text-center 3xs:text-start">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <ProfileTabLinks />
      <Outlet />
    </div>
  );
}

export default UserProfileLayout;
