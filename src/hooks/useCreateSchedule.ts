import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export function useCreateSchedule() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (
      body: BodyScheduleMutation,
    ): Promise<BodyScheduleMutation> => {
      const response = await api.post("/scheduling", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Agendamento criado com sucesso!");
      navigate("/dashboard");
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
    createSchedule: mutateAsync,
  };
}
