import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export function useUpdatePatient() {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ body, scheduleId }: any): Promise<any> => {
      const response = await api.patch(`/scheduling/${scheduleId}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Agendamento atualizado com sucesso!");
      window.location.reload();
    },
    onError(error) {
      console.log("Caiu no onError do useCreateSchedule", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    updatePatient: mutateAsync,
  };
}
