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
