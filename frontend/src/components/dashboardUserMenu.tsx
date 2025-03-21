import { useTheme } from "@/contexts/theme.context";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ComputerIcon,
  DoorOpenIcon,
  MoonIcon,
  SunIcon,
  User2Icon,
} from "lucide-react";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import { toast } from "sonner";

const DashboardUserMenu: FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();

      navigate("/login", { replace: true });
      toast.success("Logged out successfully");
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex gap-2 items-center hover:bg-accent/50 dark:hover:bg-accent/25 p-2 rounded-lg transition-colors cursor-pointer">
          <div className="flex items-center gap-2 bg-accent/50 dark:bg-accent/25 p-2 rounded-lg">
            <User2Icon size={24} />
          </div>
          <div className="-space-y-1.5">
            <p className="text-muted-foreground text-xs">Logged as:</p>
            <p>{user?.email}</p>
          </div>

          <div className="ml-auto bg-accent/50 dark:bg-accent/25 p-1 rounded-lg">
            <ChevronDownIcon
              size={18}
              className={cn("rotate-180 transition-transform", {
                "rotate-0": open,
              })}
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  disabled={theme === "light"}
                >
                  <SunIcon />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  disabled={theme === "dark"}
                >
                  <MoonIcon />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  disabled={theme === "system"}
                >
                  <ComputerIcon />
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/" className="cursor-pointer">
              Back to site
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            <DoorOpenIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserMenu;
