import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import LinkButton from "../../components/Buttons/LinkButton";

import GenericForm from "../../components/Forms/GenericForm";
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';

import { ownerService } from "../../services/owner-service";
import { petService } from "../../services/pet-service";

function CreatePet() {
    const [owners, setOwners] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
    }, []);

    const fields = [
        { name: "owner_id", label: "Dono", type: "select", placeholder: "Selecione o dono", options: [...owners.map(owner => ({ label: owner.name, value: owner.id }))], full: true },
        { name: "name", label: "Nome", placeholder: "Digite o nome" },
        { name: "species", label: "Especie", placeholder: "Digite a especie" },
        { name: "breed", label: "Raça", placeholder: "Digite a raça" },
        { name: "birthdate", label: "Data de nascimento", type: "date", placeholder: "Digite a data de nascimento" }
    ];

    const initialValues = { owner_id: "", name: "", species: "", breed: "", birthdate: "" };

    const validateField = (name, value) => {
        if (name === "name" && !value.trim()) return "Campo obrigatório.";
        if (name === "species" && !value.trim()) return "Campo obrigatório.";
        return "";
    };

    async function submit(values) {
        setError('');
        try {
            await petService.create(values);
            ToastSuccess("Pet cadastrado com sucesso!");
            navigate("/pets");
        } catch (err) {
            ToastError(err.message);
            setError(err.message);
        }
    }

    return (
        <div className="w-full px-6 pt-4 flex flex-col">
            <LinkButton to="/pets" color="none" className="flex items-center">
                <ArrowLeftIcon size={20} className="mr-2" /> Voltar
            </LinkButton>

            <h1 className="pt-4 pb-6 text-title font-bold">Cadastrar Pet</h1>

            {error && 
                <span className="w-full p-4 bg-red-200 text-red-500 font-semibold border-red-700 border rounded">
                    {error}
                </span>
            }

            <GenericForm
                fields={fields}
                initialValues={initialValues}
                validateField={validateField}
                onSubmit={submit}
            />
        </div>
    )
}

export default CreatePet;