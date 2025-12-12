import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ArrowLeftIcon, 
    PlusIcon,
    PawPrintIcon,
    PencilSimpleIcon,
    TrashSimpleIcon
} from "@phosphor-icons/react";

import LinkButton from "@/components/Buttons/LinkButton";
import Spinner from "../../components/Spinners/Spinner";
import Card from "../../components/Cards/Card";
import { ToastError, ToastSuccess } from "@/components/Toasts/Toast.js";
import { ShowModal } from "@/components/Modals/Modal";

import { petService } from "@/services/pet-service";
import ErrorPage from "../ErrorPage";

function ListPets() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pets, setPets] = useState([]);

    const navigate = useNavigate();

    async function loadPets() {
        setError('');
        try {
            setLoading(true);
            const data = await petService.list();
            setPets(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPets();
    }, []);

    function handleEdit(id) {
        navigate(`/pets/edit/${id}`);
    }

    async function handleDelete(id) {
        ShowModal({
            title: "Excluir pet?",
            text: "Essa ação é irreversível e removerá o registro permanentemente.",
            icon: "warning",
            confirmText: "Sim, excluir",
            cancelText: "Cancelar",
            confirmColor: "#d33",
            cancelColor: "#0C2E7B",

            preConfirm: async () => {
                try {
                    await petService.remove(id);
                    ToastSuccess("pet deletado com sucesso!");
                    loadPets();
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

                <h1 className="pt-4 pb-8 text-title font-bold">Pet</h1>

                <LinkButton
                    to="/pets/new"
                    className="w-full md:w-60 rounded p-2 flex items-center justify-center bg-primary hover:bg-primaryDark text-white text-center"
                >
                    <PlusIcon size="20" color="#fff" className="mr-2" />
                    Cadastrar Pet
                </LinkButton>
            </div>
            <div className="w-full flex flex-wrap items-center justify-start gap-4">
                {pets.map((pet) => (
                    <Card
                        key={pet.id}
                        icon={PawPrintIcon}
                        title={pet.name}
                        fields={[
                            {label: "especie", value: pet.species},
                            {label: "Raça", value: pet.breed},
                            {label: "Data de nascimento", value: new Date(pet.birthdate).toLocaleDateString()},
                            {label: "Dono", value: pet.owner_name},
                        ]}
                        actions={[
                            {
                                label: 'Editar',
                                color: 'primary',
                                icon: PencilSimpleIcon,
                                onClick: () => handleEdit(pet.id),
                            },
                            {
                                label: 'Excluir',
                                color: 'danger',
                                icon: TrashSimpleIcon,
                                onClick: () => handleDelete(pet.id),
                            }
                        ]}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListPets; 