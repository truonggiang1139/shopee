import { Outlet } from "react-router-dom";
import UserSideNav from "../../components/UserSideNav";

export default function UserLayout() {
  return (
    <div className="bg-outline py-16 text-sm text-gray-600">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-10">
          <div className="md:col-span-3 lg:col-span-2">
            <UserSideNav />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
