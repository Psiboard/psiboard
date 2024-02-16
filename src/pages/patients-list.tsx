import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import ModalEdit from "../components/modal-edit";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils";
import { useAuth } from "../hooks/auth";


export function PatientsList() {

  const {user} = useAuth();

  const [patientsList, isLoading] = useFetch({
    url: `${BASE_URL}/professional/${user.id}/patients`,
    method: 'GET',
  });


  const [open, setIsOpen] = useState(false);
  function onClose(){
    setIsOpen(false);
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-700 mb-10">
        Sua lista de pacientes
      </h1>
      <div>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Pacientes cadastrados</TableCaption>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Idade</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Endereço</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patientsList?.map((patient:any) => (
                <Tr>
                  <>
                    <Td>{patient.name}</Td>
                    <Td>{patient.age}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.phone}</Td>
                    <Td>{patient.adress}</Td>
                    <Td className="flex gap-2">
                      <Button colorScheme="teal" size="xs" onClick={()=>setIsOpen(true)}>
                        Editar
                      </Button>
                      <Button colorScheme="red" size="xs">
                        Excluir
                      </Button>
                    </Td>
                  </>
                </Tr>
              ))}
              <ModalEdit isOpen={open} onClose={onClose}/>
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
