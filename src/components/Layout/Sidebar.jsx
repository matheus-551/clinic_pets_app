import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <aside className="hidden lg:flex w-80 flex-col bg-primary text-white">
        <div className="p-4 font-bold flex items-center justify-center">
          <span className="text-md">Clinica Seu Pet</span>
        </div>

        <nav className="flex-1 p-1 justify-start items-center space-y-3">
          <Link
            to="/owners"
            className="w-full block text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
            href="#"
          >
            Donos de Pets
          </Link>
          <a
            className="w-full block text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
            href="#"
          >
            Pets
          </a>
          <a
            className="w-full block text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
            href="#"
          >
            Agendamentos
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
