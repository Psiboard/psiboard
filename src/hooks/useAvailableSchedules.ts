import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { BASE_URL, fetchHeaders } from "../utils";

export function useAvailableSchedules({ scheduleDate }: any) {
  const { user } = useAuth();
  const { data, refetch } = useQuery({
    queryKey: ["available-schedules", scheduleDate],
    queryFn: async () => {
      const response = await api.get(
        `${BASE_URL}/scheduling/user/${user?.id}/available?date=${scheduleDate}`,
        { headers: fetchHeaders() },
      );
      return response.data;
    },
    enabled: !!scheduleDate,
  });

  return {
    availableSchedules: data ?? [],
    refetch,
  };
}
