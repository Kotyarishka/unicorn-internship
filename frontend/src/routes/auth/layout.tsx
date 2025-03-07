import { FC } from "react";
import { ZapIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "@/contexts/theme.context";
import { Button } from "@/components/ui/button";

const AuthLayout: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-primary-foreground">
              <ZapIcon size={16} />
            </div>
            WattWise
          </Link>

          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            Boom
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login/image.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
