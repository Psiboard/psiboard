import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useCreateSchedule } from "../hooks/useCreateSchedule";
import { usePatients } from "../hooks/usePatients";
import { useAvailableSchedules } from "../hooks/useAvailableSchedules";

export function Schedules() {
  const { user } = useAuth();

  // States
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [scheduleDate, setScheduleDate] = useState<string>(
    formatDate(new Date()),
  );
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  // Hooks
  const { createSchedule } = useCreateSchedule();
  const { patients } = usePatients();
  const { availableSchedules, refetch } = useAvailableSchedules({
    scheduleDate,
  });

  useEffect(() => {
    refetch();
  }, [scheduleDate]);

  function handleChangeCalendarDay(date: Date) {
    setScheduleDate(formatDate(date));
  }

  async function onSubmit() {
    const body = {
      date: scheduleDate,
      hour: selectedSchedule,
      type: "MARCACAO",
      patient_id: selectedPatient,
      user_id: user?.id,
    };
    if (Object.values(body).some((value) => value === "")) {
      toast.error("Por favor! Selecione a DATA, o PACIENTE, e o HORÁRIO.");
      return;
    }

    try {
      await createSchedule(body);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-5 px-1">
      <h1 className="text-3xl font-bold text-gray-700 mb-10 text-center">
        Agende o horário
      </h1>

      <div>
        <div className="flex md:flex-row flex-col-reverse w-full justify-between">
          <div className="sm:w-[50%] w-[75%] flex flex-col md:gap-5 gap-10 py-5 md:px-3 rounded-sm">
            <div>
              <label>Paciente</label>
              <Select
                placeholder="Selecione o paciente"
                className="w-auto flex items-center justify-center"
                onChange={(event) => setSelectedPatient(event.target.value)}
              >
                {patients?.map((patient: Patients) => (
                  <React.Fragment key={patient?.id}>
                    <option value={patient?.id}>{patient?.name}</option>
                  </React.Fragment>
                ))}
              </Select>
            </div>
            <div>
              <label>Horário</label>
              <Select
                placeholder="Selecione o horário"
                className="w-auto flex items-center justify-center"
                onChange={(event) => setSelectedSchedule(event.target.value)}
              >
                {availableSchedules?.map((schedules: string) => (
                  <React.Fragment key={schedules}>
                    <option value={schedules}>{schedules}</option>
                  </React.Fragment>
                ))}
              </Select>
            </div>
            <Button colorScheme="teal" size="lg" onClick={onSubmit}>
              Criar agendamento
            </Button>
          </div>

          <div className="sm:pr-10 w-[95%]">
            <p className="text-xl mb-2 font-semibold">
              Selecione a data do agendamento
            </p>
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
              onDayClick={handleChangeCalendarDay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
