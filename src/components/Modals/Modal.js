import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swal = withReactContent(Swal)

/**
 * Modal genérico reutilizável
 */
export function ShowModal({
    title = "Confirmação",
    text = "Deseja realmente continuar?",
    icon = "question",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmColor = "#0C2E7B",
    cancelColor = "#ED474A",
    showCancel = true,
    onConfirm = () => {},
    onCancel = () => {}
}) {
    swal.fire({
        title,
        text,
        icon,
        showCancelButton: showCancel,
        confirmButtonColor: confirmColor,
        cancelButtonColor: cancelColor,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else {
            onCancel();
        }
    });
}
