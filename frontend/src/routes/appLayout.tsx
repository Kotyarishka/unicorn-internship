import NavBar from "@/components/navbar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const AppLayout: FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mb-5 mt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
