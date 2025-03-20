import DeleteProviderButton from "@/components/providerDelete";
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
import { editProvider, getProvider } from "@/lib/api";
import { EditProviderInput, editProviderSchema } from "@/validators/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const DashboardEditProvider: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const queryClient = useQueryClient();
  const form = useForm<EditProviderInput>({
    resolver: zodResolver(editProviderSchema),
    defaultValues: {
      name: "",
      country: "",
      marketShare: 0,
      renewableEnergyPercentage: 0,
      yearlyRevenue: 0,
    },
  });

  const { mutate: edit, isPending } = useMutation({
    mutationFn: (data: EditProviderInput) => editProvider(id!, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["providers"],
      });
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/dashboard/providers", { replace: true });
      toast.success("Provider updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred. Try again later.");
    },
  });

  const {
    isLoading,
    data,
    error,
    isError,
    refetch: refetchProvider,
  } = useQuery({
    queryKey: ["provider", id],
    queryFn: () => getProvider(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data) {
      refetchProvider();
      return;
    }

    form.reset(data.provider);
  }, [id, data, form, refetchProvider]);

  const handleSubmit = (data: EditProviderInput) => {
    edit(data);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-20 bg-accent/50 dark:bg-accent/25 rounded-lg">
        <LoaderPinwheelIcon size={48} className="animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col min-h-20 gap-5 bg-red-400/5 rounded-lg">
        <p>{error?.message || "An error occurred. Try again later."}</p>
        <div>
          <Link to="/dashboard/providers" className={buttonVariants()}>
            Back to providers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="-space-y-1.5">
          <h1 className="text-lg font-bold">Edit {data?.provider.name}</h1>
          <p className="text-muted-foreground">at {data?.provider.country}</p>
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

            <div className="flex items-center gap-2 w-full">
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? "Updating provider..." : "Update provider"}
              </Button>
              <DeleteProviderButton
                className="w-[25%]"
                provider={data.provider!}
                navigateTo="/dashboard/providers"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DashboardEditProvider;
