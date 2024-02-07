import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

export function Schedules() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, "dd/MM/yyyy")}.</p>
  ) : null;
  const patients = ["Cliente 01", "Cliente 02", "Cliente 03", "Cliente 04"];
  const schedules = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-700 mb-10">
        Agende o horário
      </h1>

      <div>
        <div className="flex w-full justify-between">
          <div className="w-[50%] flex flex-col gap-5 py-5 px-3 rounded-sm">
            <div>
              <label>Cliente</label>
              <Select
                placeholder="Selecione o paciente"
                className="w-auto flex items-center justify-center"
                onChange={(event) => console.log(event.target.value)}
              >
                {patients.map((patient) => (
                  <>
                    <option key={patient} value={patient}>
                      {patient}
                    </option>
                  </>
                ))}
              </Select>
            </div>
            <div>
              <label>Hora:</label>
              <Select
                placeholder="Selecione o horário"
                className="w-auto flex items-center justify-center"
                onChange={(event) => console.log(event.target.value)}
              >
                {schedules.map((schedules) => (
                  <>
                    <option key={schedules} value={schedules}>
                      {schedules}
                    </option>
                  </>
                ))}
              </Select>
            </div>
          </div>

          <div className="pr-10">
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
