import { MoonIcon, SunIcon, ZapIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { useTheme } from "@/contexts/theme.context";
import { cn } from "@/lib/utils";

const NavBar: FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-5 z-50">
      <div
        className={cn(
          "flex items-center justify-between p-4 max-w-[1300px] mx-auto w-full border border-accent mt-5 rounded-lg transition-all",
          {
            "max-w-[1350px] backdrop-blur-md p-2 px-4": scrolled,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-primary-foreground">
              <ZapIcon size={16} />
            </div>
            WattWise
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="secondary"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
          {user ? (
            <Link to="/dashboard" className={buttonVariants()}>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
