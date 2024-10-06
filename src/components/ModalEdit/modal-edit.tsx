/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateSchedule } from "../../hooks/useUpdateSchedule";
import { useAvailableSchedules } from "../../hooks/useAvailableSchedules";

export default function ModalEdit({
  isOpen,
  onClose,
  hour,
  scheduleId,
  patientId,
  name,
  date,
}: ModalProps) {
  const { user }: any | null = useAuth();
  const [selectedHour, setSelectedHour] = useState("");
  const [rescheduling, setRescheduling] = useState("");
  const [scheduleDate, setScheduleDate] = useState<undefined | string>(date);
  const { updateSchedule } = useUpdateSchedule();
  const { availableSchedules, refetch } = useAvailableSchedules({
    scheduleDate,
  });

  useEffect(() => {
    refetch();
  }, [scheduleDate]);

  async function handleChangeDate(date: any) {
    setScheduleDate(date);
  }

  async function submitUpdateSchedule() {
    const body = {
      date: scheduleDate,
      hour: selectedHour,
      type: rescheduling,
      user_id: user.id,
      patient_id: patientId,
    };
    if (Object.values(body).some((value) => value === "")) {
      toast.error("Por favor! Selecione a DATA, o PACIENTE, e o HORÁRIO.");
      return;
    }
    try {
      await updateSchedule({ body, scheduleId });
    } catch (error) {
      console.log(error);
    }
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

            <div className="flex justify-between items-center gap-10 mb-6">
              <label htmlFor="">Marque o campo de remarcação</label>
              <div className="flex justify-items-end flex-row items-end">
                <input
                  type="checkbox"
                  id="remarcacao"
                  name="remarcacao"
                  value="REMARCACAO"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRescheduling(e.target.value)
                  }
                />
                <span className="flex text-[14px] text-red-600 font-extrabold text-right">
                  *
                </span>
              </div>
            </div>
          </div>
          <div className=" flex justify-between pt-0 pb-8 px-8">
            <Button
              colorScheme="red"
              size="sm"
              onClick={onClose}
              data-testid="cancel"
            >
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={submitUpdateSchedule}
              data-testid="edit"
            >
              Editar
            </Button>
          </div>
        </div>
      </div>
    );
  } else return null;
}
