import { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from "@phosphor-icons/react";

import LinkButton from '@/components/Buttons/LinkButton';
import GenericForm from '@/components/Forms/GenericForm';
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';

import { petService } from '@/services/pet-service';
import { ownerService } from '@/services/owner-service';

import ErrorPage from '@/pages/ErrorPage';
import Spinner from '@/components/Spinners/Spinner';

function UpdatePet() {
    const [pet, setPet] = useState(null);
    const [owners, setOwners] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function loadOwners() {
            try {
                setError('');
                const data = await ownerService.list();
                setOwners(data);
            } catch (err) {
                ToastError(err.message);
                setError(err.message);
            }
        }

        loadOwners();
    }, [])

    useEffect(() => {
        async function loadPet() {
            try {
                setError('');
                const data = await petService.getById(id);
                setPet({
                    owner_id: data.owner_id,
                    name: data.name,
                    species: data.species,
                    breed: data.breed,
                    birthdate: formatDate(data.birthdate)
                });
            } catch (err) {
                ToastError(err.message);
                setError(err.message);
            }
        }

        if (id) loadPet();
    }, [id]);

    const fields = [
        { name: "owner_id", label: "Dono", type: "select", placeholder: "Selecione o dono", options: [...owners.map(owner => ({ label: owner.name, value: owner.id }))], full: true },
        { name: "name", label: "Nome", placeholder: "Digite o nome" },
        { name: "species", label: "Especie", placeholder: "Digite a especie" },
        { name: "breed", label: "Raça", placeholder: "Digite a raça" },
        { name: "birthdate", label: "Data de nascimento", type: "date", placeholder: "Digite a data de nascimento" }
    ];

    const validateField = (name, value) => {
        if (name === "name" && !value.trim()) return "Campo obrigatório.";
        if (name === "species" && !value.trim()) return "Campo obrigatório.";
        return "";
    };

    const formatDate = (isoString) => {
        return isoString ? isoString.split("T")[0] : "";
    };

    const submit = async (data) => {
        try {
            setError('');
            await petService.update(id, data);
            ToastSuccess("Pet atualizado com sucesso!");
            navigate("/pets");
        } catch (err) {
            ToastError(err.message);
        }
    }

    if (error) return <ErrorPage message={error} />;
    if (!pet) return <Spinner />;

    return (
        <div className="w-full px-6 pt-4 flex flex-col">

            <LinkButton to="/pets" color="none" className="flex items-center">
                <ArrowLeftIcon size={20} className="mr-2" /> Voltar
            </LinkButton>

            <h1 className="pt-4 pb-6 text-title font-bold">Atualizar Pet</h1>

            <GenericForm
                fields={fields}
                initialValues={pet}
                validateField={validateField}
                onSubmit={submit}
            />
        </div>
    );
}

export default UpdatePet;