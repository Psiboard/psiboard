import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export function useCreateProfessional() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async ( body : Profesisonal): Promise<Profesisonal> => {
      console.log("Body recebido no mutationFn():", body);
      const response = await api.post("/professional", body);
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
