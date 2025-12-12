import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
  ArrowLeftIcon,
  CalendarDotsIcon,
  ArrowClockwiseIcon,
} from '@phosphor-icons/react';

import ErrorPage from '../ErrorPage';

import Spinner from '@/components/Spinners/Spinner';
import LinkButton from '@/components/Buttons/LinkButton';
import { ToastError, ToastSuccess } from '@/components/Toasts/Toast.js';
import { ShowModal } from '@/components/Modals/Modal';

import { appointmentService } from '@/services/appointment-service';
import Card from '@/components/Cards/Card';

function ListAppointment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    async function loadAppointments() {
        setError('');
        try {
            setLoading(true);
            const data = await appointmentService.list();
            setAppointments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, [])

    function handleEdit(id) {
        navigate(`/owners/edit/${id}`);
    }

    async function handleDelete(id) {
        ShowModal({
            title: "Excluir agendamento?",
            text: "Essa ação é irreversível e removerá o registro permanentemente.",
            icon: "warning",
            confirmText: "Sim, excluir",
            cancelText: "Cancelar",
            confirmColor: "#d33",
            cancelColor: "#0C2E7B",

            onConfirm: async () => {
                try {
                    await appointmentService.remove(id);
                    ToastSuccess("Agendamento deletado com sucesso!");
                    loadAppointments();
                } catch (err) {
                    ToastError(err.message);
                }
            }
        });
    }

    async function handlerUpdateStatus(id) {
        ShowModal({
            title: 'Alterar status do agendamento?',
            text: 'Selecione o novo status do agendamento.',
            icon: 'info',

            withInput: true,
            typeInput: 'select',
            inputOptions: {
                AGENDADA: 'AGENDADA',
                CANCELADA: 'CANCELADA',
                REALIZADA: 'REALIZADA',
            },
            loaderConfirm: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            preConfirm: async (status) => {
                try {
                    await appointmentService.update(id, { status });
                    ToastSuccess('Agendamento atualizado com sucesso!');
                    loadAppointments();
                }
                catch (err) {
                    ToastError(err.message);
                }
            }
        })
    }

    if (loading) return <Spinner />;
    if (error) return <ErrorPage message={error} onRetry={loadAppointments}/>;

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex-col gap-4 items-center justify-start mb-6">
                <LinkButton to="/" color="none" className="bg-none flex items-center">
                <ArrowLeftIcon size="20" color="#000" className="mr-2" />
                    Voltar
                </LinkButton>

                <h1 className="pt-4 pb-8 text-title font-bold">Agendamentos</h1>

                <LinkButton
                    to="/appointments/new"
                    className="w-full md:w-60 rounded p-2 flex items-center justify-center bg-primary hover:bg-primaryDark text-white text-center"
                >
                    <PlusIcon size="20" color="#fff" className="mr-2" />
                    Cadastrar Agendamento
                </LinkButton>
            </div>
                <div className="w-full flex flex-wrap items-center justify-start gap-4">
                {appointments.map((appointment) => (
                    <Card
                        key={appointment.id}
                        icon={CalendarDotsIcon}
                        fields={[
                            { label: 'Dono do animal', value: appointment.owner_name },
                            { label: 'Animal', value: appointment.pet_name },
                            { label: 'Veterinário', value: appointment.veterinarian_name },
                            { label: 'Descrição', value: appointment.description },
                            { label: 'Data', value: new Date(appointment.date).toLocaleDateString() },
                            { label: 'Hora', value: new Date(appointment.date).toLocaleTimeString() },
                        ]}
                        badges={[
                            {
                                label: 'Status',
                                text: appointment.status,            // <- texto do badge
                                type:
                                appointment.status === 'AGENDADA'
                                    ? 'pending'
                                    : appointment.status === 'REALIZADA'
                                    ? 'active'
                                    : 'inactive',
                                size: 'lg',
                                textSize: 'sm',
                            }
                        ]}
                        actions={[
                            {
                                label: 'Editar',
                                color: 'primary',
                                icon: PencilSimpleIcon,
                                onClick: () => handleEdit(appointment.id),
                            },
                            {
                                label: 'Excluir',
                                color: 'danger',
                                icon: TrashSimpleIcon,
                                onClick: () => handleDelete(appointment.id),
                            },
                            {
                                label: 'Alterar Status',
                                color: 'secondary',
                                icon: ArrowClockwiseIcon,
                                onClick:async () => await handlerUpdateStatus(appointment.id),
                            }
                        ]}
                    />
                ))}
                </div>
        </div>
    );
}

export default ListAppointment;