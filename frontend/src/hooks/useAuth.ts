import { getUser, UserData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = (validate: boolean = false) => {
  const { data, ...rest } = useQuery<UserData>({
    queryKey: ["auth"],
    queryFn: () => getUser(validate),
    staleTime: Infinity,
  });

  return {
    user: data?.user,
    ...rest,
  };
};

export default useAuth;
