import { WarningCircleIcon } from "@phosphor-icons/react";

function ErrorPage({ message = "Algo deu errado.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-4 p-5">
      <WarningCircleIcon size={72} weight="bold" className="text-red-600" />
      <h2 className="text-2xl font-semibold text-gray-800">Oops!</h2>
      <p className="text-gray-600">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default ErrorPage;