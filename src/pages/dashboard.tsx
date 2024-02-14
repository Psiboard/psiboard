import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { statisticsData } from "../mocks";
const data = [1, 2, 3, 4, 5];

export function Dashboard() {

  const [selectedDay, setSelectedDay] = useState<Date>();
  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, "dd/MM/yyyy")}.</p>
  ) : null;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-700 mb-10">
        Bem vindo, Daniel Nogueira
      </h1>
      <div className="flex items-center justify-between mt-4">
        {statisticsData.map((item) => (
          <>
            <div className=" cursor-pointer w-[240px] flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow ">
              <div dangerouslySetInnerHTML={{ __html: item.icon }} className="h-8"></div>

              <div className="flex justify-start items-center gap-1">
                <span className="text-2xl font-bold text-black dark:text-white">
                  {item.number}
                </span>
                <h5 className="text-xl font-medium text-gray-700 ">
                  {item.label}
                </h5>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-xl mb-3 text-gray-700">Seus agendamentos do dia</p>
        <div className="flex w-full h-[400px]">
          <div className="w-[50%] flex flex-col custom-scrollbar items-start max-h-[80%] overflow-y-auto scroll-smooth pl-1 pr-2 pt-2 pb-0">
            {data.map(() => (
              <div className="h-auto flex  items-center bg-gray-100 rounded-[8px] w-[100%] mb-3 mt-1 ">
                <span className="bg-[#02969c] h-[100%] text-[#fff] flex items-center mr-4 p-[0.8rem] rounded-[8px_0_0_8px]">
                  10:00h
                </span>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-1 py-2">
                    <p className="text-gray-700 text-[1.2rem]">Daniel</p>
                    <p className="text-gray-700 text-[1.2rem]">03/02/2024</p>
                    <p className="text-gray-700 text-[1.2rem]">
                      Telefone: 83987633390
                    </p>
                  </div>
                  <div className="flex flex-col mr-5 gap-5">
                    <span
                      className="cursor-pointer"
                      onClick={() => alert("Editou")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => alert("Removeu")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[50%] flex flex-col items-center">
            <DayPicker
              className="bg-[#00a5ab] shadow-[4px_8px_4px_rgb(0,0,0,0.3)] p-4 rounded-[10px] w-auto items-center flex justify-center"
              classNames={{
                day: "w-10 h-10 text text-[#fff] m-[0.15rem] rounded-[5px]",
                month: "text-[#fff]",
                caption: "mb-4",
              }}
              modifiersClassNames={{
                selected: "text-[#017377] bg-[#0dcdd4]",
              }}
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
              footer={footer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
