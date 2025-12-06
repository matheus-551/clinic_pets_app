import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center p-5">
      <MagnifyingGlassIcon size={72} weight="bold" className="text-gray-700" />

      <h1 className="text-3xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600">Página não encontrada.</p>

      <Link
        to="/"
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
