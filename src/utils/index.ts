import Cookies from "js-cookie";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const formatDate = (date: Date) => {
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

export const sleep = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const formatDateToInput = (date: string) => {
  const parts = date.split("-");
  const newDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return newDate;
};
