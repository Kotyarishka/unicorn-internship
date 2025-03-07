import { FC } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
