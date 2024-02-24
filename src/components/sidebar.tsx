import { Link } from "react-router-dom";
import custome from "../assets/custome.png";
import { useAuth } from "../hooks/useAuth";
import React, { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const items = [
  { name: "Cadastrar pacientes", link: "/dashboard/patients" },
  { name: "Listar pacientes", link: "/dashboard/patients-list" },
  { name: "Criar Agendamento", link: "/dashboard/schedules" },
];

export default function SideBar() {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const windowSize = useWindowSize();
  console.log("Window width:", windowSize.width);

  return (
    <React.Fragment>
      {!isOpen && windowSize.width < 1024 && (
        <button className="absolute top-6 left-6" data-testid="button-mobile-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setIsOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
      )}
      {isOpen && windowSize.width < 1024 && (
        <div className="z-50 flex h-screen fixed left-0 top-0 bg-[#02969c] text-[#fff] lg:w-1/5 w-[75%] px-5 py-8 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pr-2">
              <Link to="/dashboard">
                <img
                  src={custome}
                  alt="Logo"
                  data-testid="logo"
                  className="h-16 w-auto cursor-pointer mb-4"
                />
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 lg:hidden flex mr-10 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>

            <ul>
              {items.map((item) => (
                <React.Fragment key={item.name}>
                  <Link to={item.link}>
                    <li className="py-2 px-1 rounded-md hover:bg-[#07d6de]">
                      {item.name}
                    </li>
                  </Link>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div>
            <button
              onClick={signOut}
              className="px-4 py-2 w-[120px] bg-[#22c3c8] text-gray-100 font-semibold rounded flex justify-center gap-1"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {windowSize.width > 1024 && (
        <div className="flex h-screen fixed left-0 top-0 bg-[#02969c] text-[#fff] lg:w-1/5 w-[75%] px-5 py-8 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pr-2">
              <Link to="/dashboard">
                <img
                  src={custome}
                  alt="Logo"
                  data-testid="logo"
                  className="h-16 w-auto cursor-pointer mb-4"
                />
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 lg:hidden flex mr-10 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <ul>
              {items.map((item) => (
                <React.Fragment key={item.name}>
                  <Link to={item.link}>
                    <li className="py-2 px-1 rounded-md hover:bg-[#07d6de]">
                      {item.name}
                    </li>
                  </Link>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div>
            <button
              onClick={signOut}
              className="px-4 py-2 w-[120px] bg-[#22c3c8] text-gray-100 font-semibold rounded flex justify-center gap-1"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
