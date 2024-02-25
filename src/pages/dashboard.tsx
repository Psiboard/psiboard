import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { statisticsData } from "../mocks";
import { useAuth } from "../hooks/useAuth";
import { formatDate, BASE_URL, fetchHeaders } from "../utils";
import React from "react";
import Card from "../components/card";
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

      <div className="flex md:flex-row flex-col lg:items-center items-start justify-between mt-4">
        {statisticsData.map((item) => (
          <React.Fragment key={item.label}>
            <div className=" cursor-pointer md:w-[240px] w-[100%] md:mb-0 mb-3 flex flex-col justify-start gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow ">
              <div
                dangerouslySetInnerHTML={{ __html: item.icon }}
                className="h-8"
              ></div>

              <div className="flex justify-start items-center gap-1">
                <span className="text-2xl font-bold text-black dark:text-white">
                  {item.number}
                </span>
                <h5 className="text-xl font-medium text-gray-700 ">
                  {item.label}
                </h5>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-xl text-gray-700">
          Seus agendamentos do dia: {scheduleDate}
        </p>
        {/* {isFetching && <Loading type="spinner" />} */}
        <div className="flex w-full md:h-auto md:flex-row flex-col md:gap-0 gap-10 md:items-start items-center md:mt-0 mt-5">
          <div className="md:w-[50%] w-full flex flex-col custom-scrollbar items-start max-h-[80%] overflow-y-auto scroll-smooth pl-1 pr-2 pt-2 pb-0">
            {data && (
              <React.Fragment>
                {data?.map((schedule: any) => (
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
