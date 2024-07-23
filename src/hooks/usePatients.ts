import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { BASE_URL, fetchHeaders } from "../utils";
import { useAuth } from "./useAuth";

export function usePatients() {
  const { user } = useAuth();
  const { data, refetch, isLoading, isFetching, error } = useQuery({
    queryKey: ["patients-list"],
    queryFn: async () => {
      const response = await api.get(
        `${BASE_URL}/professional/${user?.id}/patients`,
        { headers: fetchHeaders() },
      );
      return response.data;
    },
  });

  return {
    patients: data ?? [],
    refetch,
    isLoading,
    isFetching,
    error,
  };
}
