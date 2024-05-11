import React from "react";
import { usePatients } from "../../hooks/usePatients";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

interface Props {
  schedules: Array<any>;
  scheduleDate: any;
}
export default function Statistics({ schedules, scheduleDate }: Props) {

  const { patients } = usePatients();
  const { data: availableSchedules } = useQuery({
    queryKey: ["available-schedules", scheduleDate],
    queryFn: async () => {
      const response = await api.get(
        `/scheduling/available-schedules?date=${scheduleDate}`,
      );
      console.log(response.data);
      return response.data;
    },
  });
  const statisticsData = [
    {
      label: "Total Pacientes: ",
      number: patients?.length,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>',
    },
    {
      label: "Agendamentos: ",
      number: schedules?.length,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" /></svg>',
    },
    {
      label: "Horários vagos: ",
      number: availableSchedules?.length,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>',
    },
  ];
  return (
    <div className="flex md:flex-row flex-col lg:items-center items-start justify-between mt-4">
      {statisticsData.map((item) => (
        <React.Fragment key={item.label}>
          <div className=" cursor-pointer md:w-[240px] w-[100%] md:mb-0 mb-3 flex flex-col justify-start gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow ">
            <div
              dangerouslySetInnerHTML={{ __html: item.icon }}
              className="h-8"
            ></div>
            <div className="flex justify-start items-center gap-1">
              <span className="text-xl font-medium text-gray-700 ">
                {item.label}
              </span>
              <span className="text-xl font-bold text-black dark:text-white">
                {item.number}
              </span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
