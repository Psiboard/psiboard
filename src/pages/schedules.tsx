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

export function Schedules() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [scheduleDate, setScheduleDate] = useState<string>(
    formatDate(new Date()),
  );
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patients, setPatients] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([
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
  ]);
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleChangeCalendarDay(date: any) {
    setScheduleDate(formatDate(date));
  }

  // Buscando os clientes do Profissional
  useEffect(() => {
    api
      .get(`/professional/${user.id}/patients`, {
        headers: fetchHeaders(),
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => console.log(error));
  }, [user.id]);

  // Buscando horarios disponiveis quando a data muda
  useEffect(() => {
    api
      .get(`/scheduling/available-schedules?date=${scheduleDate}`, {
        headers: fetchHeaders(),
      })
      .then((response) => {
        setAvailableSchedules(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedDay, scheduleDate]);

  function onSubmit() {
    const body = {
      date: scheduleDate,
      hour: selectedSchedule,
      patient: selectedPatient,
      professional: user.id,
    };
    if (Object.values(body).some((value) => value === "")) {
      toast.error("Por favor! Selecione a DATA, o PACIENTE, e o HORÁRIO.");
    }
    console.log(body);
    api
      .post("/scheduling", body)
      .then(() => {
        toast.success("Agendamento criado com sucesso!");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.log(error);
        }
      });
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-700 mb-10">
        Agende o horário
      </h1>

      <div>
        <div className="flex w-full justify-between">
          <div className="w-[50%] flex flex-col gap-5 py-5 px-3 rounded-sm">
            <div>
              <label>Paciente</label>
              <Select
                placeholder="Selecione o paciente"
                className="w-auto flex items-center justify-center"
                onChange={(event) => setSelectedPatient(event.target.value)}
              >
                {patients?.map((patient) => (
                  <React.Fragment>
                    <option key={patient} value={patient?.id}>
                      {patient?.name}
                    </option>
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
                {availableSchedules.map((schedules) => (
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
