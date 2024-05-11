import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import Statistics from "../components/Statistics/statistics";
import { useAuth } from "../hooks/useAuth";
import { formatDate, BASE_URL, fetchHeaders } from "../utils";
import React from "react";
import Card from "../components/Card/card";
import api from "../services/api";

export function Dashboard() {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const formatedDate = formatDate(new Date());
  const [scheduleDate, setScheduleDate] = useState<string>(formatedDate);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["schedules", scheduleDate, user.id],
    queryFn: async () => {
      const response = await api.get(
        `${BASE_URL}/scheduling/today/${user.id}?date=${scheduleDate}`,
        { headers: fetchHeaders() },
      );
      return response.data;
    },
    enabled: !!scheduleDate,
  });

  function handleChangeCalendarDay(date: any) {
    setScheduleDate(formatDate(date));
    refetch();
  }

  return (
    <div className="px-5 mb-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-700 mb-10 mt-5 lg:text-start text-center">
          Bem vindo, {user.nome}
        </h1>
      </div>

      <Statistics schedules={data} scheduleDate={scheduleDate}/>

      <div className="mt-10">
        <p className="text-xl text-gray-700">
          Seus agendamentos do dia: {scheduleDate}
        </p>
        {/* {isFetching && <Loading type="spinner" />} */}
        <div className="flex w-full md:h-auto md:flex-row flex-col md:gap-0 gap-10 md:items-start items-center md:mt-0 mt-5">
          <div className="md:w-[50%] w-full flex flex-col custom-scrollbar items-start max-h-[80%] overflow-y-auto scroll-smooth pl-1 pr-2 pt-2 pb-0">
            {data && (
              <React.Fragment>
                {data?.map((schedule: Schedule) => (
                  <Card
                    scheduleId={schedule.id}
                    hour={schedule.hour}
                    date={schedule.date}
                    name={schedule?.patient?.name}
                    phone={schedule?.patient?.phone}
                    patientId={schedule?.patient?.id}
                  />
                ))}
              </React.Fragment>
            )}

            {data?.length <= 0 && !isFetching && (
              <h3 className="text-primary text-3xl mt-4">
                Você não tem agendamentos para este dia!
              </h3>
            )}
          </div>
          <div className="md:w-[50%] w-full flex flex-col items-center">
            <div className="md:w-auto w-full">
              <DayPicker
                className="bg-[#00a5ab] shadow-[4px_8px_4px_rgb(0,0,0,0.3)] p-4 rounded-[10px] w-auto items-center flex justify-center"
                classNames={{
                  day: "sm:w-10 w-8 h-10 text text-[#fff] m-[0.15rem] rounded-[5px]",
                  month: "text-[#fff]",
                  caption: "mb-4",
                }}
                modifiersClassNames={{
                  selected: "text-[#017377] bg-[#0dcdd4]",
                }}
                mode="single"
                onSelect={setSelectedDay}
                onDayClick={handleChangeCalendarDay}
                selected={selectedDay}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
