import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from "@phosphor-icons/react";

import LinkButton from '@/components/Buttons/LinkButton';
import GenericForm from '@/components/Forms/GenericForm';
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';

import { petService } from '@/services/pet-service';
import { appointmentService } from '@/services/appointment-service';

import ErrorPage from '../ErrorPage';
import Spinner from '@/components/Spinners/Spinner';

function UpdateAppointment() {
    const [appointment, setAppointment] = useState(null);
    const [pets, setPets] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    // ﹣﹣﹣﹣ Carrega pets ﹣﹣﹣﹣
    useEffect(() => {
        async function loadPets() {
            try {
                setError("");
                const data = await petService.list();
                setPets(data);
            } catch (err) {
                setError(err.message);
                ToastError(err.message);
            }
        }

        loadPets();
    }, []);

    // ﹣﹣﹣﹣ Carrega agendamento ﹣﹣﹣﹣
    useEffect(() => {
        async function loadAppointment() {
            try {
                setError("");
                const data = await appointmentService.getById(id);

                const dt = new Date(data.date);

                // Formatar em valores aceitos pelo input:
                const date = dt.toISOString().split("T")[0];
                const hour = dt.toTimeString().slice(0, 5);

                setAppointment({
                    pet_id: data.pet_id,
                    veterinarian_name: data.veterinarian_name,
                    description: data.description,
                    date,
                    hour,
                });

            } catch (err) {
                setError(err.message);
                ToastError(err.message);
            }
        }

        if (id) loadAppointment();
    }, [id]);

    const fields = [
        { 
            name: "pet_id", 
            label: "Animal",
            type: "select",
            options: [
                { label: "Selecione...", value: "" },
                ...pets.map(pet => ({ label: pet.name, value: pet.id }))
            ],
            full: true 
        },
        { 
            name: "veterinarian_name", 
            label: "Veterinário(a)", 
            placeholder: "Digite o nome" 
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

    const validateField = (name, value) => {
        if (!value) return "Campo obrigatório.";
        return "";
    };

    // Formatador final
    function formatDateTime(date, hour) {
        const seconds = "00";
        return `${date} ${hour}:${seconds}`;
    }

    async function submit(data) {
        try {
            const request = {
                pet_id: data.pet_id,
                veterinarian_name: data.veterinarian_name,
                description: data.description,
                date: formatDateTime(data.date, data.hour)
            };

            await appointmentService.update(id, request);
            ToastSuccess("Agendamento atualizado com sucesso!");
            navigate("/appointments");

        } catch (err) {
            ToastError(err.message);
            setError(err.message);
        }
    }

    if (error) return <ErrorPage message={error} />;
    if (!appointment) return <Spinner />;

    return (
        <div className="w-full px-6 pt-4 flex flex-col">

            <LinkButton to="/appointments" color="none" className="flex items-center">
                <ArrowLeftIcon size={20} className="mr-2" /> Voltar
            </LinkButton>

            <h1 className="pt-4 pb-6 text-title font-bold">Atualizar Agendamento</h1>

            <GenericForm
                fields={fields}
                initialValues={appointment}
                validateField={validateField}
                onSubmit={submit}
            />
        </div>
    );
}

export default UpdateAppointment;
