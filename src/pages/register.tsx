import React, { useState } from "react";
import { z, ZodError } from "zod";
import { Link } from "react-router-dom";
import custome from "../assets/custome.png";
import { useCreateProfessional } from "../hooks/useCreateProfessional";
import Loading from "../components/loading";

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email("Por favor, insira um endereço de e-mail válido."),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres."),
});

export function Register() {
  const { createProfessional } = useCreateProfessional();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<ZodError | null>(null);
  const [errors, setErrors] = useState({});

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    try {
      registerSchema.parse(formData);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === name);
        if (fieldError) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError.message,
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Validar os dados do formulário com Zod
      const body = registerSchema.parse(formData);
      await createProfessional({ body });
    } catch (error) {
      setIsLoading(false);
      if (error instanceof ZodError) {
        setFormError(error);
      }
    }
  }
  return (
    <React.Fragment>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {isLoading && <Loading type="request" />}
        <div className=" flex flex-col items-center">
          <img
            src={custome}
            alt="Logo"
            className="h-16 w-auto cursor-pointer"
          />
          <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Comece hoje no PsiBoard
          </h1>
        </div>

        {formError?.errors.map((error, index) => (
          <div className="flex justify-center">
            <div className="bg-slate-100 w-auto mt-3 p-2 border-red-400 border-[1px] rounded-lg">
              <span
                key={index}
                className="text-red-500 font-medium rounded-md mt-4"
              >
                {error.message}
              </span>
            </div>
          </div>
        ))}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  data-testid="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="nome"
                  placeholder="João da Silva"
                  required
                  className="block w-full h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  data-testid="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  placeholder="meu.email@example.com"
                  required
                  className="block w-full h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  placeholder="********"
                  required
                  className="block w-full  h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full h-[36px] justify-center rounded-md bg-[#02969c] px-3 py-1.5 text-sm font-semibold leading-6 text-[#fff] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cadastrar
              </button>
            </div>
          </form>

          <div className="flex items-start flex-col gap-2 mt-2">
            <p className="text-center text-sm text-gray-800">
              Já possui conta?
              <Link
                to="/login"
                className="font-semibold leading-6 text-gray-800 ml-1"
              >
                Faça Login
              </Link>
            </p>
            <Link className="text-sm" to="/">
              Voltar para home
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
