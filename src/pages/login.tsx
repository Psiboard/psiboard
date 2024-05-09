import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import custome from "../assets/custome.png";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading/loading";

const loginSchema = z.object({
  email: z.string().email("Por favor, insira um endereço de e-mail válido."),
  password: z.string(),
});

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signIn, loading } = useAuth();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      // Validar os dados do formulário com Zod
      loginSchema.parse(formData);
      signIn(formData);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cover bg-center">
        {loading && <Loading type="request" />}
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <img
              src={custome}
              alt="Logo"
              className="h-16 w-auto cursor-pointer"
            />
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Faça login na sua conta
            </h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    placeholder="meu.email@example.com"
                    required
                    className="block w-full h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    placeholder="********"
                    required
                    className="block w-full  h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full h-[36px] justify-center rounded-md bg-[#02969c] px-3 py-1.5 text-sm font-semibold leading-6 text-[#fff] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </form>

            <div className="flex items-start flex-col gap-2 mt-2">
              <p className="text-center text-sm text-gray-800">
                Não possui conta?
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-gray-800 ml-1"
                >
                  Cadastre-se
                </Link>
              </p>
              <Link className="text-sm" to="/">
                Voltar para home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
