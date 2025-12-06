import { CircleNotchIcon } from "@phosphor-icons/react";

function Spinner({ message = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 gap-3">
      <CircleNotchIcon size={42} weight="bold" className="animate-spin text-blue-600" />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>
  );
}

export default Spinner;