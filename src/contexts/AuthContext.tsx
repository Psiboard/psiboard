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
  signIn: ({email, password}: ISignIn) => void;
  signOut: () => void;
  user: IUserData;
  availableSchedules: Array<string>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
  const availableSchedules = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
 const [user, setUser] = useState(() => {
   const user = Cookies.get("user@data");
   if (user) {
     return JSON.parse(user);
   }
   return {};
 });

  // Variavel de controle de usuário logado
  const isAuthenticated = !!user && Object.keys(user).length !== 0;
  const navigate = useNavigate();

  async function signIn({ email, password }: ISignIn) {
    try {
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
      Cookies.set("token@data", data.access_token, { expires:  1 /  24 });
      navigate("/dashboard");
      toast.success(`Seja bem vindo(a), ${userData.nome}`);
      setUser(userData);
      return data;
    } catch {
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
          availableSchedules,
          isAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    );

}
