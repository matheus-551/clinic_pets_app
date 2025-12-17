import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Cabeçalho */}
      <section className="bg-primary text-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo à Clínica Seu Pet
        </h1>
        <p className="text-lg opacity-90">
          Sistema de gerenciamento para donos, pets e agendamentos da clínica.
        </p>
      </section>
    </div>
  );
}

export default Home;
