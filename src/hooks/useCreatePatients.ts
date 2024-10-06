import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { BASE_URL } from "../utils";

export function useCreatePatient() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (body: Patients): Promise<Patients> => {
      const response = await api.post(`${BASE_URL}/patients`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Paciente cadastrado com sucesso!");
      navigate("/dashboard");
    },
    onError(error) {
      console.log("Caiu no onError do useCreatePatient", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    createPatient: mutateAsync,
  };
}
