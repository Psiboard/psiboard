import { Link } from "react-router-dom";
import custome from "../assets/custome.png";
import { useAuth } from "../hooks/auth";

const items = [
  { name: "Cadastrar pacientes", link: "/dashboard/patients" },
  { name: "Listar pacientes", link: "/dashboard/patients-list" },
  { name: "Criar Agendamento", link: "/dashboard/schedules" },
];

export default function SideBar() {
  const {signOut} = useAuth();
  return (
    <div className="h-screen fixed left-0 top-0 bg-[#02969c] text-[#fff] w-1/5 px-5 py-8 flex flex-col justify-between">
      <div>
        <Link to="/dashboard">
          <img
            src={custome}
            alt="Logo"
            className="h-16 w-auto cursor-pointer  mb-4"
          />
        </Link>
        <ul>
          {items.map((item) => (
            <>
              <Link to={item.link}>
                <li className="py-2 px-1 rounded-md hover:bg-[#07d6de]">
                  {item.name}
                </li>
              </Link>
            </>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={signOut}
          className="px-4 py-2 w-[120px] bg-[#07d6de] text-gray-100 font-semibold rounded flex justify-center gap-1">
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
