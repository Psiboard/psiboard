import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useCreatePatient } from "../hooks/useCreatePatients";

export function Patients() {
  const { register, handleSubmit } = useForm<Patients>();
  const { user } = useAuth();
  const { createPatient } = useCreatePatient();

  async function onSubmit(formData: Patients) {
    formData.age = Number(formData.age);
    const body: BodyPatientMutation = { ...formData, professional: user?.id };

    console.log(body);
    try {
      await createPatient(body);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 p-10">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900">
            Cadastre o seu paciente
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Preencha atentamente as informações do seu paciente
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informações pessoais
          </h2>

          <div className="mt-10 sm:grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome Completo
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  placeholder="Ex: José da Silva"
                  {...register("name", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Idade
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="age"
                  placeholder="Ex: 20"
                  {...register("age", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Ex: jose.silva@teste.com"
                  {...register("email", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone para contato
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="phone"
                  placeholder="Use o formato (XX) XXXXX-XXXX"
                  {...register("phone", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Endereço
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  autoComplete="address"
                  placeholder="Ex: Rua jardim de orquideas, n°0, Bairro das Flores, Cidade-Estado"
                  {...register("adress", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CEP
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="zip_code"
                  autoComplete="zip_code"
                  placeholder="Ex: 01001-900"
                  {...register("zip_code", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Informações Adicionais
              </label>
              <div className="mt-2">
                <textarea
                  id="info_add"
                  rows={3}
                  placeholder="Use esse campo para adicionar informações que considere relevantes sobre o paciente"
                  {...register("info_add", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Informações que podem ser consideradas relevantes.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 lg:w-[15%] w-[40%] text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#02969c] px-3 py-2 lg:w-[15%] w-[40%] text-sm font-semibold text-white shadow-sm hover:bg-[#44babe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
}
