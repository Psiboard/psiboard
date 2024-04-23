import { ReactNode, createContext, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAuthProvider {
  children: ReactNode;
}
interface IUserData {
  nome: string;
  email: string;
  id: number;
}
interface ISignIn {
  email: string;
  password: string;
}
interface IAuthContextData {
  signIn: ({ email, password }: ISignIn) => void;
  signOut: () => void;
  user: IUserData;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState(() => {
    const user = Cookies.get("user@data");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });
  const [loading, setLoading] = useState(false);

  // Variavel de controle de usuário logado
  const isAuthenticated = !!user && Object.keys(user).length !== 0;
  const navigate = useNavigate();

  async function signIn({ email, password }: ISignIn) {
    try {
      setLoading(true);
      const { data } = await api.post(`/auth/login`, {
        email: email,
        password: password,
      });
      const userData = {
        email: data.email,
        nome: data.name,
        id: data.id,
      };
      Cookies.set("user@data", JSON.stringify(userData), { expires: 1 / 24 });
      Cookies.set("token@data", data.access_token, { expires: 1 / 24 });
      navigate("/dashboard");
      toast.success(`Seja bem vindo(a), ${userData.nome}`);
      setUser(userData);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Não conseguimos realizar o login. Tente mais tarde");
    }
  }
  function signOut() {
    Cookies.remove("user@data");
    Cookies.remove("token@data");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        isAuthenticated,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
