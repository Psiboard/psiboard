/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select } from "@chakra-ui/react";
import { useState } from "react";
import { formatDateToInput } from "../utils";
import { isAxiosError } from "axios";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function ModalEdit({
  isOpen,
  onClose,
  hour,
  scheduleId,
  patientId,
  name,
  date,
}: any) {
  const { user } = useAuth();
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [rescheduling, setRescheduling] = useState("");
  const [scheduleDate, setScheduleDate] = useState<undefined | string>("");

  async function handleChangeDate(date: any) {
    let inputDate = formatDateToInput(date);
    api
      .get(`/scheduling/available-schedules?date=${inputDate}`)
      .then((res) => {
        console.log(res.data);
        setScheduleDate(inputDate);
        setAvailableSchedules(res.data);
      })
      .catch((err) => {
        if (isAxiosError(err)) toast.error(err.response?.data.message);
      });
  }

  function submitUpdateSchedule() {
    const data = {
      date: scheduleDate,
      hour: selectedHour,
      type: rescheduling,
      id: scheduleId,
      patient: patientId,
      professional: user.id,
    };
    console.log(data);
    api
      .patch(`/scheduling/${scheduleId}`, data)
      .then(() => {
        toast.success("Agendamento atualizado com sucesso!");
        window.location.reload();
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.log(error);
        }
      });
  }

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-[9] bg-[rgb(0,0,0,0.3)] ">
        <div className="fixed -translate-x-2/4 -translate-y-2/4 w-[450px] bg-[#fff] rounded-2xl left-2/4 top-2/4">
          <div className="bg-[#02969c] text-[#fff] flex justify-between p-8 rounded-[16px_16px_0_0]">
            <h2>Editar Horário</h2>
            <button onClick={onClose}>
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-8 py-4">
            <p className="text-2xl font-medium">
              {name} - {hour}h
            </p>
            <p className="text-xl mb-4 font-medium">Atual data: {date}</p>
            <p>{selectedHour}</p>

            <div className="flex justify-between items-center mb-6">
              <label htmlFor="">Indique uma nova data</label>
              <input
                type="date"
                className="border w-2/5 p-[0.3rem] rounded-[10px] border-solid"
                onChange={(event) => handleChangeDate(event.target.value)}
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <label htmlFor="">Horários disponiveis</label>
              <Select
                name=""
                id=""
                placeholder="Selecione o horário"
                className="border p-[0.3rem] rounded-[10px] border-solid"
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                {availableSchedules
                  ? availableSchedules.map((hora: any, index: any) => {
                      return (
                        <option value={hora} key={index}>
                          {hora}
                        </option>
                      );
                    })
                  : null}
              </Select>
            </div>

            <div className="flex justify-between items-center mb-6">
              <label htmlFor="">Marque o campo de remarcação</label>
              <input
                type="checkbox"
                id="remarcacao"
                name="remarcacao"
                value="remarcacao"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRescheduling(e.target.value)
                }
              />
            </div>
          </div>
          <div className=" flex justify-between pt-0 pb-8 px-8">
            <Button colorScheme="red" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="teal" size="sm" onClick={submitUpdateSchedule}>
              Editar
            </Button>
          </div>
        </div>
      </div>
    );
  } else return null;
}
