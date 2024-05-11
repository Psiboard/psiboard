import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useAvailableSchedule({ date }: any) {
  const { data, refetch, isLoading, isFetching, error } = useQuery({
    queryKey: ["available-schedules"],
    queryFn: async () => {
      const response = await api.get(
        `/scheduling/available-schedules?date=${date}`
      );
      return response.data;
    },
  });

  return {
    availableSchedules: data ?? [],
    refetch,
    isLoading,
    isFetching,
    error,
  };
}
