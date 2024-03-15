import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { usePatients } from "../hooks/usePatients";

export function PatientsList() {
  const { patients } = usePatients();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-700 mb-10 text-center">
        Sua lista de pacientes
      </h1>
      <div>
        <TableContainer
          className="custom-scrollbar"
          data-testid="patients-table"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Idade</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Endereço</Th>
                {/* <Th>Ações</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {patients?.map((patient: Patients) => (
                <Tr key={patient.id}>
                  <React.Fragment>
                    <Td>{patient.name}</Td>
                    <Td>{patient.age}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.phone}</Td>
                    <Td>{patient.adress}</Td>
                    {/* <Td className="flex gap-2">
                      <Button
                        colorScheme="teal"
                        size="xs"
                        onClick={() => alert('Editou')}
                      >
                        Editar
                      </Button>
                      <Button colorScheme="red" size="xs">
                        Excluir
                      </Button>
                    </Td> */}
                  </React.Fragment>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
