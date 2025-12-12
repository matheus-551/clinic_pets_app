import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swal = withReactContent(Swal)

export function ShowModal({
    title = "Confirmação",
    text = "Deseja realmente continuar?",
    icon = "question",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmColor = "#0C2E7B",
    cancelColor = "#ED474A",
    showCancel = true,
    withInput = false,
    typeInput = "text",
    inputLabel = "",
    inputPlaceholder = "",
    inputValue = "",
    inputOptions = {},
    preConfirm = null,
    onCancel = () => {},
}) {

    const options = {
        title,
        text,
        icon,
        showCancelButton: showCancel,
        confirmButtonColor: confirmColor,
        cancelButtonColor: cancelColor,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showLoaderOnConfirm: !!preConfirm,
        allowOutsideClick: () => !Swal.isLoading(),

        customClass: {
            input:
                "border rounded-md px-3 py-2 bg-white text-gray-800 " +
                "focus:ring-2 focus:ring-primary focus:border-primary",
            popup: "rounded-xl",
        }
    };

    if (withInput) {
        options.input = typeInput;
        options.inputLabel = inputLabel;
        options.inputPlaceholder = inputPlaceholder;
        options.inputValue = inputValue;

        if (typeInput === "select") {
            options.inputOptions = inputOptions;
        }
    }

    if (preConfirm) {
        options.preConfirm = async (value) => {
            try {
                return await preConfirm(value);
            } catch (err) {
                Swal.showValidationMessage(
                    err.message || "Ocorreu um erro inesperado"
                );
            }
        };
    }

    swal.fire(options).then((result) => {
        if (!result.isConfirmed) {
            onCancel();
        }

        customClass: {
        input:
        "border rounded-md px-3 py-2 bg-white text-gray-800 " +
        "focus:ring-2 focus:ring-primary focus:border-primary"
    }
    });    
}
