import React, { useRef, useState } from "react";
import ModalEdit from "../ModalEdit/modal-edit";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useDeleteSchedule } from "../../hooks/useDeleteSchedule";
import { usePatient } from "../../hooks/usePatient";

export default function Card({ scheduleId, patientId, hour, date }: CardProps) {
  const cancelRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const { deleteSchedule } = useDeleteSchedule();
  const { patient } = usePatient(patientId);

  function handleClose() {
    setOpen(false);
  }

  async function handleDelete(id: string) {
    try {
      await deleteSchedule(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <div
        key={scheduleId}
        className="h-auto md:gap-0 gap-5 flex md:flex-row flex-col items-center bg-gray-100 rounded-[8px] w-[100%] mb-3 mt-1 "
      >
        <div
          data-testid="hour"
          className="bg-[#02969c] sm:h-[140px] h-[80px] md:w-auto w-full text-[#fff] flex flex-col items-start gap-1 md:mr-4 p-[0.8rem] md:rounded-[8px_0_0_8px] rounded-md"
        >
          <p data-testid="name" className="text-white text-[1.2rem]">
            Paciente: {patient?.name}
          </p>
          <hr/>
          <p>Horario: {hour}h</p>
        </div>
        <div className="flex md:flex-row flex-col justify-between md:items-center w-full md:p-0 px-2">
          <div className="flex flex-col gap-1 py-2">
            <p data-testid="phone" className="text-gray-700 text-[1.2rem]">
              Contato: {patient?.phone}
            </p>

            <p data-testid="email" className="text-gray-700 text-[1.2rem]">
              Email: {patient?.email}
            </p>

            <p data-testid="address" className="text-gray-700 text-[1.2rem]">
              Endereço: {patient?.street}, {patient?.district}, {patient?.city},{" "}
              {patient?.state}
            </p>
          </div>
          <div className="flex md:flex-col md:mr-5 gap-5 md:py-0 py-3 md:justify-center justify-around">
            <span className="cursor-pointer" onClick={() => setOpen(true)}>
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
              data-testid="delete-icon"
              onClick={onOpen}
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
      <ModalEdit
        isOpen={open}
        onClose={handleClose}
        name={patient?.name}
        scheduleId={scheduleId}
        patientId={patientId}
        hour={hour}
        date={date}
        phone={patient?.phone}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              data-testid="delete-header"
            >
              Deletar agendamento
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir ? Essa ação é irreversivel.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(scheduleId)}
                ml={3}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </React.Fragment>
  );
}
