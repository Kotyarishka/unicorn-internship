import { deleteToken, type Token } from "@/lib/api";
import { FC, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface tokenProps {
  token: Token;
}

const Token: FC<tokenProps> = ({ token }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteToken,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });

      toast.success(message);
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred. Try again later.");
    },
  });
  return (
    <div
      key={token._id}
      className="bg-accent/50 dark:bg-accent/25 p-2 space-y-5"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Token {token._id}</h2>
          {token.description && <p>{token.description}</p>}
        </div>
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Revoke token
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently revoke this
                token.
              </DialogDescription>
            </DialogHeader>
            <div>
              <p>
                You are about to revoke token <strong>{token._id}</strong>.
              </p>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsDeleteOpen(false);
                  mutate(token._id);
                }}
                className={buttonVariants({ variant: "destructive" })}
                disabled={isPending}
              >
                {isPending ? "Revoking..." : "Revoke"}
              </Button>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 rounded-lg overflow-hidden gap-2">
        <div className="bg-accent dark:bg-accent/50 p-2">
          <p className="text-sm text-muted-foreground">Created</p>
          <p className="text-lg font-semibold">
            {new Date(token.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="bg-accent dark:bg-accent/50 p-2">
          <p className="text-sm text-muted-foreground">Expires</p>
          <p className="text-lg font-semibold">
            {new Date(token.expiresAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Token;
