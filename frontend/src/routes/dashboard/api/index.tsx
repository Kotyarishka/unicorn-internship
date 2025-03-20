import Token from "@/components/token";
import { buttonVariants } from "@/components/ui/button";
import { getTokens } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardApiIndex: FC = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => getTokens(),
  });
  const location = useLocation();
  const createdToken = location.state?.token as string;

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-20 bg-accent/50 dark:bg-accent/25 rounded-lg">
        <LoaderPinwheelIcon size={48} className="animate-spin" />
      </div>
    );

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col min-h-20 gap-5 bg-red-400/5 rounded-lg">
        <p>{error?.message || "An error occurred. Try again later."}</p>
        <div>
          <Link to="/dashboard" className={buttonVariants()}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const tokens = data?.tokens;
  if (!tokens) return <div>No tokens found.</div>;

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <div className="-space-y-1.5">
          <h1 className="text-lg font-bold">API Keys</h1>
          <p className="text-muted-foreground">
            Add or delete API keys, you can use these keys to access the API.
          </p>
        </div>
        <Link to="add" className={buttonVariants()}>
          Create API key
        </Link>
      </div>
      {createdToken && (
        <div className="bg-green-500/50 dark:bg-green-500/25 p-2 rounded-lg">
          <p className="font-semibold">Token created successfully.</p>
          <p>
            Please remember it, you won't be able to see it again. If you lose
            it, you'll have to create a new one.
          </p>

          <div className="mt-2 space-y-1">
            <p>Your token:</p>
            <code className="bg-accent/50 dark:bg-accent/50 rounded-md w-full block p-2">
              {createdToken}
            </code>
          </div>
        </div>
      )}
      <ScrollArea className="max-h-full rounded-lg overflow-hidden">
        <div className="space-y-2">
          {tokens.map((token) => (
            <Token key={token._id} token={token} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardApiIndex;
