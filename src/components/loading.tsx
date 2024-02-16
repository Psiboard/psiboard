
interface TypeProps {
  type: "request" | "spinner";
}

export default function Loading({ type }: TypeProps) {
  return (
    <>
      {type === "spinner" ? (
        <span className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-f9f9f9 border-t-4 border-[#02969c] rounded-3xl inline-block animate-spin"></span>
      ) : (
        <p className="text-lg px-2 py-1 bg-white rounded-full w-1/2 mx-auto mb-4 text-center animate-fade-in">
          Aguarde um pouco...
        </p>
      )}
    </>
  );
}
