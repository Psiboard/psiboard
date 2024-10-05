import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { BASE_URL, fetchHeaders } from "../utils";

export function usePatient(id: any) {
  const { data, refetch, isLoading, isFetching, error } = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      const response = await api.get(`${BASE_URL}/patients/patient/${id}`, {
        headers: fetchHeaders(),
      });
      return response.data;
    },
  });

  return {
    patient: data ?? null,
    refetch,
    isLoading,
    isFetching,
    error,
  };
}
