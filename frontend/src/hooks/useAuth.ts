import { getUser, UserData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const { data, ...rest } = useQuery<UserData>({
    queryKey: ["auth"],
    queryFn: getUser,
    staleTime: Infinity,
  });

  return {
    user: data?.user,
    ...rest,
  };
};

export default useAuth;
