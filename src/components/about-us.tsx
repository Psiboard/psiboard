const stats = [
  { name: "Escritórios atendidos", value: "10" },
  { name: "Profissionais cadastrados", value: "10" },
  { name: "Marcações diárias", value: "10" },
  { name: "em um só lugar", value: "Agendamentos" },
];

export default function About() {
  return (
    <div className="relative isolate overflow-hidden  py-24 sm:py-32">
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div />
      </div>
      <div className="mx-0 max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-[#000] sm:text-6xl text-center sm:text-start">
            Nossa missão
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#000] font-normal">
            Nossa missão é centralizar e unificar o controle de atendimentos
            para pequenos e médios consultórios, tendo em vista atender a
            demanda de sublocações de salas.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="flex flex-col gap-3 lg:flex-row lg:justify-between justify-start">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-[#000]-300">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-[#000]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
