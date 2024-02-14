import { ReactNode, createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

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
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
  ];
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user@data");
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
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      console.log(data);
      const userData = {
        email: data.email,
        nome: data.name,
        id: data.id,
      };
      localStorage.setItem("user@data", JSON.stringify(userData));
      localStorage.setItem("token@data", data.access_token);
      navigate("/dashboard");
      toast.success(`Seja bem vindo(a), ${userData.nome}`);
      setUser(userData);
      return data;
    } catch {
      toast.error("Não conseguimos realizar o login. Tente mais tarde");
    }
  }
   function signOut() {
     localStorage.removeItem("user@data");
     localStorage.removeItem("token@data");
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
