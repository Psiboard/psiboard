// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth is not in AuthProvider");
//   }
//   return context;
// }

import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

type ISignIn = {
  email: string;
  password: string;
};

export function useAuth() {
  const navigate = useNavigate();
  const { signIn, ...rest } = useAuthStore();

  const customSignIn = async ({ email, password }: ISignIn) => {
    await signIn({ email, password });
    const userData = useAuthStore.getState().user;
    if (userData) {
      navigate("/dashboard");
    }
  };

  return {
    ...rest,
    signIn: customSignIn,
  };
}
