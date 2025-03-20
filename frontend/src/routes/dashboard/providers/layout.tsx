import { ProvidersProvider } from "@/contexts/providers.provider";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const DashboardProvidersLayout: FC = () => {
  return (
    <ProvidersProvider>
      <Outlet />
    </ProvidersProvider>
  );
};

export default DashboardProvidersLayout;
