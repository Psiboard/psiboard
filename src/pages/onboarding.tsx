import { Link } from "react-router-dom";
import onboarding from "../assets/onboarding.png";
import About from "../components/AboutUs/about-us";
import custome from "../assets/custome.png";
import React from "react";

export function Onboarding() {
  return (
    <React.Fragment>
      <nav className="sm:flex flex sm:flex-row flex-col justify-between items-center py-4 px-8 sm:mb-0 mb-10 text-white">
        <div className="flex items-center">
          <img
            src={custome}
            alt="Logo"
            className="h-16 w-auto cursor-pointer mb-5"
          />
        </div>

        <div className="sm:flex items-center space-x-4">
          <button
            className="px-4 py-1 bg-[#02969c] text-[#fff] font-semibold rounded"
            data-testid="button-onboarding"
          >
            <Link to="/login">Fazer Login</Link>
          </button>
          <button
            className="px-4 py-1 bg-[#02969c] text-[#fff] font-semibold rounded"
            data-testid="button-onboarding"
          >
            <Link to="/register">Cadastre-se</Link>
          </button>
        </div>
      </nav>
      <div className="flex sm:justify-between flex-col sm:flex-row text-center sm:text-start  items-center sm:pr-4 sm:pl-8 px-5 pt-0 w-full">
        <div className="sm:w-[50%] sm:mt-0 mt-5 justify-start">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="font-bold tracking-tight text-5xl text-center sm:text-start">
              PsiBoard, é praticidade
            </h2>
            <p className="mt-6 text-lg leading-8">
              Centralize os atendimentos do consultório em um só lugar e tenha o
              controle com acesso fácil, simples e objetivo.
            </p>
          </div>
          <button className="px-4 py-2 mt-4 bg-[#02969c] text-[#fff] font-semibold rounded">
            <a href="#about">Sobre nós</a>
          </button>
        </div>

        <div className="w-[50%] justify-end bg-cover bg-center flex">
          <img
            src={onboarding}
            alt="onboardingImage"
            className="sm:flex hidden h-[500px] w-auto object-contain justify-end"
          />
        </div>
      </div>
      <div id="about">
        <About />
      </div>
    </React.Fragment>
  );
}
