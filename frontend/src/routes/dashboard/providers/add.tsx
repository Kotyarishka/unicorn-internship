import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProvider } from "@/lib/api";
import {
  CreateProviderInput,
  createProviderSchema,
} from "@/validators/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardAddProvider: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<CreateProviderInput>({
    resolver: zodResolver(createProviderSchema),
    defaultValues: {
      name: "",
      country: "",
      marketShare: 0,
      renewableEnergyPercentage: 0,
      yearlyRevenue: 0,
    },
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: createProvider,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["providers"],
      });

      navigate("/dashboard/providers", { replace: true });
      toast.success("Provider created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred. Try again later.");
    },
  });

  const handleSubmit = (data: CreateProviderInput) => {
    create(data);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="-space-y-1.5">
          <h1 className="text-lg font-bold">New electricity provider</h1>
          <p className="text-muted-foreground">
            Here you can create a new electricity provider
          </p>
        </div>
        <div className="space-x-2">
          <Link
            to="/dashboard/providers"
            className={buttonVariants({ variant: "secondary" })}
          >
            Back to providers
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Energy Co..."
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="USA..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly revenue</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="4806000..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketShare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market share</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="10..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="renewableEnergyPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renewable energy</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="18..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating provider..." : "Create provider"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DashboardAddProvider;
