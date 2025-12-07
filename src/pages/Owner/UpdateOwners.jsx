import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LinkButton from "../../components/Buttons/LinkButton";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import GenericForm from "../../components/Forms/GenericForm";
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';

import { ownerService } from "../../services/owner-service";
import ErrorPage from "../ErrorPage";
import Spinner from "../../components/Spinners/Spinner";

function UpdateOwners() {
    const [owner, setOwner] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function loadOwner() {
            try {
                setError("");
                const data = await ownerService.getById(id);
                setOwner(data);
            } catch (err) {
                ToastError(err.message);
                setError(err.message);
            }
        }

        if (id) loadOwner();
    }, [id]);

    const fields = [
        { name: "name", label: "Nome", placeholder: "Digite o nome" },
        { name: "phone", label: "Telefone", placeholder: "Digite o telefone" },
        { name: "address", label: "Endereço", placeholder: "Digite o endereço", full: true }
    ];

    const validateField = (name, value) => {
        if (name === "name" && !value.trim()) return "Campo obrigatório.";
        if (name === "phone" && value.length < 8) return "Telefone inválido.";
        return "";
    };

    async function submit(values) {
        try {
            const ownerUpdate = {
                name: values.name,
                phone: values.phone,
                address: values.address
            };

            await ownerService.update(id, ownerUpdate);
            ToastSuccess("Dono atualizado com sucesso!");
            navigate("/owners");
        } catch (err) {
            ToastError(err.message);
            setError(err.message);
        }
    }

    if (error) return <ErrorPage message={error} />;
    if (!owner) return <Spinner />;

    return (
        <div className="w-full px-6 pt-4 flex flex-col">
            <LinkButton to="/owners" color="none" className="flex items-center">
                <ArrowLeftIcon size={20} className="mr-2" /> Voltar
            </LinkButton>

            <h1 className="pt-4 pb-6 text-title font-bold">Atualizar Dono</h1>

            <GenericForm
                fields={fields}
                initialValues={owner}       // 🔥 agora carrega os dados reais
                validateField={validateField}
                onSubmit={submit}
            />
        </div>
    );
}

export default UpdateOwners;
