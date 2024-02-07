import { Link } from "react-router-dom";
import custome from "../assets/custome.png";

export function Register() {
  return (
    <>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" flex flex-col items-center">
          <img
            src={custome}
            alt="Logo"
            className="h-16 w-auto cursor-pointer"
          />
          <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Comece hoje no AgendaPSI
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome completo
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  type="text"
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
                  autoComplete="current-password"
                  placeholder="********"
                  required
                  className="block w-full  h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
    </>
  );
}
