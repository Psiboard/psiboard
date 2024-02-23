import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export function useDeleteSchedule() {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }: any) => {
      await api.delete(`/scheduling/${id}`);
    },
    onSuccess: () => {
      toast.success("Agendamento deletado com sucesso!");
      window.location.reload();
    },
    onError(error) {
      console.log("Caiu no onError do useDeleteSchedule", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    deleteSchedule: mutateAsync,
  };
}
