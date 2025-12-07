import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LinkButton from "../../components/Buttons/LinkButton";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import GenericForm from "../../components/Forms/GenericForm";
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';

import { ownerService } from "../../services/owner-service";

function CreateOwners() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fields = [
        { name: "name", label: "Nome", placeholder: "Digite o nome" },
        { name: "phone", label: "Telefone", placeholder: "Digite o telefone" },
        { name: "address", label: "Endereço", placeholder: "Digite o endereço", full: true }
    ];

    const initialValues = { name: "", phone: "", address: "" };

    const validateField = (name, value) => {
        if (!value.trim()) return "Campo obrigatório.";
        if (name === "phone" && value.length < 8) return "Telefone inválido.";
        return "";
    };

    async function submit(values) {
        setError('');
        try {
            await ownerService.create(values);
            ToastSuccess("Dono cadastrado com sucesso!");
            navigate("/owners");
        }
        catch (err) {
            ToastError(err.message);
            setError(err.message);
        }
    }

    return (
        <div className="w-full px-6 pt-4 flex flex-col">
            <LinkButton to="/owners" color="none" className="flex items-center">
                <ArrowLeftIcon size={20} className="mr-2" /> Voltar
            </LinkButton>

            <h1 className="pt-4 pb-6 text-title font-bold">Cadastro de Dono</h1>

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
    );
}

export default CreateOwners;
