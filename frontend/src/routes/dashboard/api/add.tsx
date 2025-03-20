import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createToken } from "@/lib/api";
import { TokenInput, tokenSchema } from "@/validators/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const DashboardAddApi: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<TokenInput>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      description: "",
      expiresIn: 30,
    },
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: createToken,

    onSuccess: async ({ token }) => {
      await queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });

      navigate("/dashboard/api", {
        replace: true,
        state: {
          token,
        },
      });
    },
  });

  const handleSubmit = (data: TokenInput) => {
    create(data);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="-space-y-1.5">
          <h1 className="text-lg font-bold">New API key</h1>
          <p className="text-muted-foreground">
            Here you can create a new API key
          </p>
        </div>
        <div className="space-x-2">
          <Link
            to="/dashboard/api"
            className={buttonVariants({ variant: "secondary" })}
          >
            Back to API keys
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Energy Co..."
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    A description for the token, so you can remember what
                    it&apos;s for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expire in</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="30" {...field} required />
                  </FormControl>
                  <FormDescription>
                    The number of days until the token expires. Default is 30
                    days.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating API key..." : "Create API key"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DashboardAddApi;
