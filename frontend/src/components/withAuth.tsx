import useAuth from "@/hooks/useAuth";
import { LoaderPinwheelIcon } from "lucide-react";
import { FC } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { buttonVariants } from "./ui/button";

const WithAuth: FC = () => {
  const { user, isLoading, isError, error } = useAuth(true);

  if (isError) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-red-400/10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">An error occurred</h1>
          <div>
            <p className="text-muted-foreground">
              {error?.message || "An error occurred while fetching user data"}
            </p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
          <Link to="/" className={buttonVariants()}>
            Return to home
          </Link>
        </div>
      </div>
    );
  }

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
