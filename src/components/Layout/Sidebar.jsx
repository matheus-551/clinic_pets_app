import { Link } from 'react-router-dom';

import logo from '@/assets/logo_pawl.png';
import { CalendarIcon, HouseIcon, PawPrintIcon, UsersThreeIcon } from '@phosphor-icons/react';

function Sidebar() {
  return (
    <>
      <aside className="hidden lg:flex w-80 flex-col bg-primary text-white">
        <div className="p-4 font-bold flex items-center justify-center gap-2">
          <img src={logo} alt="Logo" className="w-12 h-10" />
          <span className="text-md">Clinica Seu Pet</span>
        </div>

        <nav className="flex-1 p-1 justify-start items-center space-y-3">
          <Link
            to="/"
            className="w-full flex items-center justify-start gap-1  text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
            href="#"
          >
            <HouseIcon size={32} />
            Inicio
          </Link>
          <Link
            to="/owners"
            className="w-full flex items-center justify-start gap-1  text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
            href="#"
          >
            <UsersThreeIcon size={32} />
            Donos de Pets
          </Link>
          <a
            className="w-full flex items-center justify-start gap-1 text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
            href="/pets"
          >
            <PawPrintIcon size={32} />
            Pets
          </a>
          <Link
            to="/appointments"
            className="w-full flex items-center justify-start gap-1 text-base text-white p-2 hover:bg-white hover:text-primary hover:rounded"
          >
            <CalendarIcon size={32} />
            Agendamentos
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
