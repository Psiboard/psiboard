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

export function PatientsList() {
  const patients = [
    {
      nome: "João",
      idade: 30,
      email: "joao@example.com",
      endereco: "Rua A, 123",
      cidade: "São Paulo",
      telefone: "1111-1111",
    },
    {
      nome: "Maria",
      idade: 25,
      email: "maria@example.com",
      endereco: "Avenida B, 456",
      cidade: "Rio de Janeiro",
      telefone: "2222-2222",
    },
    {
      nome: "Carlos",
      idade: 40,
      email: "carlos@example.com",
      endereco: "Travessa C, 789",
      cidade: "Belo Horizonte",
      telefone: "3333-3333",
    },
    {
      nome: "Ana",
      idade: 35,
      email: "ana@example.com",
      endereco: "Praça D, 321",
      cidade: "Brasília",
      telefone: "4444-4444",
    },
    {
      nome: "Pedro",
      idade: 28,
      email: "pedro@example.com",
      endereco: "Alameda E, 654",
      cidade: "Curitiba",
      telefone: "5555-5555",
    },
    {
      nome: "Mariana",
      idade: 29,
      email: "mariana@example.com",
      endereco: "Rua F, 987",
      cidade: "Salvador",
      telefone: "6666-6666",
    },
    {
      nome: "Paula",
      idade: 32,
      email: "paula@example.com",
      endereco: "Avenida G, 654",
      cidade: "Fortaleza",
      telefone: "7777-7777",
    },
    {
      nome: "Fernando",
      idade: 45,
      email: "fernando@example.com",
      endereco: "Travessa H, 321",
      cidade: "Recife",
      telefone: "8888-8888",
    },
    {
      nome: "Rafael",
      idade: 27,
      email: "rafael@example.com",
      endereco: "Praça I, 456",
      cidade: "Porto Alegre",
      telefone: "9999-9999",
    },
    {
      nome: "Juliana",
      idade: 38,
      email: "juliana@example.com",
      endereco: "Alameda J, 789",
      cidade: "Manaus",
      telefone: "1010-1010",
    },
  ];

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
                <Th>Email</Th>
                <Th>Endereço</Th>
                <Th>Cidade</Th>
                <Th>Idade</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map((patient) => (
                <Tr>
                  <>
                    <Td>{patient.nome}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.endereco}</Td>
                    <Td>{patient.cidade}</Td>
                    <Td>{patient.idade}</Td>
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
