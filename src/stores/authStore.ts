import { create } from "zustand";
import Cookies from "js-cookie";
import api from "../services/api";
import { toast } from "react-toastify";

type ISignIn = {
  email: string;
  password: string;
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: ({ email, password }: ISignIn) => Promise<void>;
  signOut: () => void;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  signIn: async ({ email, password }) => {
    try {
      set({ loading: true });
      const { data } = await api.post("/auth/login", { email, password });
      const userData = {
        email: data.email,
        nome: data.name,
        id: data.id,
      };
      Cookies.set("user@data", JSON.stringify(userData), {
        expires: 1 / 24,
      });
      Cookies.set("token@data", data.access_token, { expires: 1 / 24 });
      set({ user: userData, isAuthenticated: true, loading: false });
      toast.success(`Seja bem vindo(a), ${userData.nome}`);
    } catch {
      set({ loading: false });
      toast.error("Não conseguimos realizar o login. Tente mais tarde");
    }
  },
  signOut: () => {
    Cookies.remove("user@data");
    Cookies.remove("token@data");
    set({ user: null, isAuthenticated: false });
  },
}));
