import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { BASE_URL } from "../utils";

export function useCreateProfessional() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async ( body : Profesisonal): Promise<Profesisonal> => {
      const response = await api.post(`${BASE_URL}/auth/register`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso! Entre na sua conta");
      navigate("/");
    },
    onError(error) {
      console.log("Caiu no onError do useCreateProfessional");
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error.response?.data);
      }
    },
  });

  return {
    createProfessional: mutateAsync,
  };
}
