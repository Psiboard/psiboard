import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchHeaders, formatDate } from "../utils";
import api from "../services/api";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCreateSchedule } from "../hooks/useCreateSchedule";

export function Schedules() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [scheduleDate, setScheduleDate] = useState<string>(
    formatDate(new Date()),
  );
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createSchedule } = useCreateSchedule();

  // Buscando os clientes do Profissional
  const { data: patientsData } = useQuery({
    queryKey: ["patients", user.id],
    queryFn: async () => {
      const response = await api.get(`/professional/${user.id}/patients`, {
        headers: fetchHeaders(),
      });
      return response.data;
    },
    enabled: !!user.id,
  });

  // Buscando horarios disponiveis quando a data muda
  const { data: schedulesData } = useQuery({
    queryKey: ["schedules", selectedDay, scheduleDate],
    queryFn: async () => {
      const response = await api.get(
        `/scheduling/available-schedules?date=${scheduleDate}`,
        {
          headers: fetchHeaders(),
        },
      );
      return response.data;
    },
    enabled: !!scheduleDate,
  });

  function handleChangeCalendarDay(date: any) {
    setScheduleDate(formatDate(date));
  }

  async function onSubmit() {
    const body = {
      date: scheduleDate,
      hour: selectedSchedule,
      patient: selectedPatient,
      professional: user.id,
    };
    if (Object.values(body).some((value) => value === "")) {
      toast.error("Por favor! Selecione a DATA, o PACIENTE, e o HORÁRIO.");
      return;
    }
    // Requisição com React Query.
    try {
      await createSchedule({ body });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-700 mb-10 text-center">
        Agende o horário
      </h1>

      <div>
        <div className="flex md:flex-row flex-col-reverse w-full justify-between">
          <div className="w-[50%] flex flex-col md:gap-5 gap-10 py-5 md:px-3 rounded-sm">
            <div>
              <label>Paciente</label>
              <Select
                placeholder="Selecione o paciente"
                className="w-auto flex items-center justify-center"
                onChange={(event) => setSelectedPatient(event.target.value)}
              >
                {patientsData?.map((patient: any) => (
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
                {schedulesData?.map((schedules: any) => (
                  <React.Fragment>
                    <option key={schedules} value={schedules}>
                      {schedules}
                    </option>
                  </React.Fragment>
                ))}
              </Select>
            </div>
            <Button colorScheme="teal" size="lg" onClick={onSubmit}>
              Criar agendamento
            </Button>
          </div>

          <div className="pr-10">
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
