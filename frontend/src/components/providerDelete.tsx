import { deleteProvider, Provider } from "@/lib/api";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VariantProps } from "class-variance-authority";
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
import { toast } from "sonner";

interface DeleteProviderButtonProps {
  provider: Provider;

  className?: string;
  navigateTo?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
}

const DeleteProviderButton: FC<DeleteProviderButtonProps> = ({
  provider,
  navigateTo,
  size,
  className,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProvider(provider._id),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["providers"],
      });

      if (navigateTo) {
        navigate(navigateTo);
      }

      toast.success("Provider deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred. Try again later.");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={className} size={size} variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            provider.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>
            You are about to delete <strong>{provider.name}</strong> at{" "}
            {provider.country}.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
              mutate();
            }}
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Yes, delete"}
          </Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProviderButton;
