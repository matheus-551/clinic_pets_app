import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListIcon, XIcon } from '@phosphor-icons/react';

import logo from '../../../public/logo.png';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full lg:hidden bg-primary text-white flex items-center justify-between p-4">
        <div className="flex justify-start items-center gap-2">
          <img src={logo} alt="Logo" className="w-12 h-10 mr-2" />
          <h1 className="text-title font-semibold">Clinica Seu Pet</h1>
        </div>

        <button
          className="p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <XIcon size={28} /> : <ListIcon size={28} />}
        </button>
      </header>

      {open && (
        <nav className="lg:hidden bg-primary text-white flex flex-col shadow-inner">
          <Link
            to="/owners"
            className="p-4 border-b border-white/20 hover:bg-white hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Donos de Pets
          </Link>

          <Link
            to="/pets"
            className="p-4 border-b border-white/20 hover:bg-white hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Pets
          </Link>

          <Link
            to="/appointments"
            className="p-4 hover:bg-white hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Agendamentos
          </Link>
        </nav>
      )}
    </>
  );
}

export default Navbar;
