import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from "@phosphor-icons/react";

import LinkButton from '@/components/Buttons/LinkButton';
import GenericForm from '@/components/Forms/GenericForm';
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';

import { petService } from '@/services/pet-service';
import { appointmentService } from '@/services/appointment-service';

function CreateAppointment() {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPets() {
            try {
                setError('');
                const data = await petService.list();
                setPets(data);
            } catch (err) {
                ToastError(err.message);
                setError(err.message);
            }
        }

        loadPets();
    }, []);

    const fields = [
        { 
            name: "pet_id", 
            label: "Animal", 
            placeholder: "Selecione o animal", 
            type:"select", 
            options: [...pets.map(pet => ({ label: pet.name, value: pet.id }))], 
            full: true 
        },
        { 
            name: "veterinariam_name", 
            label: "Veterinário(a)", 
            placeholder: "Digite o veterinário(a)" 
        },
        { 
            name: "description", 
            label: "Descrição", 
            placeholder: "Digite a descrição", 
            full: true 
        },
        {
            name: "date",
            label: "Data do agendamento",
            type: "date",
        },
        {
            name: "hour",
            label: "Hora do agendamento",
            type: "time",
        }
    ];

    const initialValues = { pet_id: "", veterinarian_name: "", description: "", date: "", hour: "" };

    const validateField = (name, value) => {
        if (name === "pet_id" && !value) return "Campo obrigatório.";
        if (name === "veterinariam_name" && !value) return "Campo obrigatório.";
        if (name === "date" && !value) return "Campo obrigatório.";
        if (name === "hour" && !value) return "Campo obrigatório.";
        return "";
    };

    async function submit(values) {
        setError('');
        try {
            const request = {
                pet_id: values.pet_id,
                veterinarian_name: values.veterinariam_name,
                description: values.description,
                date: new Date(`${values.date} ${values.hour}`)
            };

            await appointmentService.create(request);
            ToastSuccess("Agendamento realizado com sucesso!");
            navigate("/appointments");
        } catch (err) {
            ToastError(err.message);
            setError(err.message);
        }
    }

    return (
        <div className="w-full px-6 pt-4 flex flex-col">
            <LinkButton to="/appoitments" color="none" className="flex items-center">
                <ArrowLeftIcon size={20} className="mr-2" /> Voltar
            </LinkButton>

            <h1 className="pt-4 pb-6 text-title font-bold">Cadastro de agendamento</h1>

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

export default CreateAppointment;