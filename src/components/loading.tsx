interface TypeProps {
  type: "request" | "spinner";
}
export default function Loading({ type }: TypeProps) {
  return (
    <>
      {type === "spinner" ? (
        <span className="absolute top-1/5 left-1/2 w-12 h-12 border-6 border-white border-t-0 border-b-white rounded-full animate-spin"></span>
      ) : (
        <p className="text-lg p-2 rounded-lg bg-white mx-auto w-1/2 mb-4 text-center animate-fade-in">
          Aguarde um pouco...
        </p>
      )}
    </>
  );
}
