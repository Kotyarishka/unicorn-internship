import useAuth from "@/hooks/useAuth";
import { LoaderPinwheelIcon } from "lucide-react";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const WithAuth: FC = () => {
  const { user, isLoading } = useAuth();
  console.log(user);
  return isLoading ? (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <LoaderPinwheelIcon size={48} className="animate-spin" />
    </div>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default WithAuth;
