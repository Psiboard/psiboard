import React from "react";

interface TypeProps {
  type: "request" | "spinner";
}

export default function Loading({ type }: TypeProps) {
  return (
    <React.Fragment>
      {type === "spinner" ? (
        <span
          data-testid="spinner"
          className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-f9f9f9 border-t-4 border-[#02969c] rounded-3xl inline-block animate-spin"
        ></span>
      ) : (
        <p
          data-testid="request"
          className="text-lg py-2 bg-[#02969c] rounded-full w-[25%] mx-auto mb-5 text-center text-[#fff] animate-fade-in"
        >
          Aguarde um pouco...
        </p>
      )}
    </React.Fragment>
  );
}
