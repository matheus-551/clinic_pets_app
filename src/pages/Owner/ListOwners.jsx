import { useEffect, useState } from 'react';
import {
  PlusIcon,
  UserIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
  ArrowLeftIcon,
} from '@phosphor-icons/react';

import LinkButton from '@/components/Buttons/LinkButton';
import Card from '../../components/Cards/Card';
import Spinner from '../../components/Spinners/Spinner';

import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';
import { ShowModal } from '@/components/Modals/Modal';

import { ownerService } from '../../services/owner-service';
import ErrorPage from '../ErrorPage';

function ListOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadOwners() {
    setError('');
    try {
      setLoading(true);
      const data = await ownerService.list();
      setOwners(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOwners();
  }, []);

  async function handleDelete(id) {
    ShowModal({
      title: "Excluir Dono?",
      text: "Essa ação é irreversível e removerá o registro permanentemente.",
      icon: "warning",
      confirmText: "Sim, excluir",
      cancelText: "Cancelar",
      confirmColor: "#d33",
      cancelColor: "#0C2E7B",

      onConfirm: async () => {
        try {
          await ownerService.remove(id);
          ToastSuccess("Dono deletado com sucesso!");
          loadOwners();
        } catch (err) {
          ToastError(err.message);
        }
      }
    });
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorPage message={error} onRetry={loadOwners}/>;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex-col gap-4 items-center justify-start mb-6">
        <LinkButton to="/" color="none" className="bg-none flex items-center">
          <ArrowLeftIcon size="20" color="#000" className="mr-2" />
          Voltar
        </LinkButton>

        <h1 className="pt-4 pb-8 text-title font-bold">Donos de Pets</h1>

        <LinkButton
          to="/owners/new"
          className="w-full md:w-60 rounded p-2 flex items-center justify-center bg-primary hover:bg-primaryDark text-white text-center"
        >
          <PlusIcon size="20" color="#fff" className="mr-2" />
          Cadastrar Dono
        </LinkButton>
      </div>

      <div className="w-full flex flex-wrap items-center justify-start gap-4">
        {owners.map((owner, index) => (
          <Card
            key={owner.id}
            icon={UserIcon}
            title={owner.name}
            fields={[
              {
                label: 'Telefone:',
                value: owner.phone,
                id: 'Telefone',
              },
              { label: 'address:', value: owner.address, id: 'address' },
            ]}
            actions={[
              {
                label: 'Editar',
                color: 'primary',
                icon: PencilSimpleIcon,
                onClick: () => openEdit(owner),
              },
              {
                label: 'Excluir',
                color: 'danger',
                icon: TrashSimpleIcon,
                onClick: () => handleDelete(owner.id),
              }
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default ListOwners;
