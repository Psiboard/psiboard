import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:3000";

export const formatDate = (date: any) => {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

export const fetchHeaders = () => {
  const token = Cookies.get("token@data");
  const header = {
    Authorization: `Bearer ${token}`,
  };

  return header;
};


export const formatDateToInput = (date: any) => {
  const parts = date.split("-");
  const newDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return newDate;
}


export const convertDateObjToString = (date: any) => {
  let dia = date.getDate();
  let mes = date.getMonth() + 1;
  let ano = date.getFullYear();
  // Formata o dia e o mês para garantir que tenham 2 dígitos
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }
  // Retorna a data formatada
  return dia + "/" + mes + "/" + ano;
}