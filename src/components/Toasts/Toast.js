import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Toast = withReactContent(Swal)

function showToast(type, title) {
    Toast.fire({
        position: "center",
        icon: type,
        title: title,
        showConfirmButton: false,
        timer: 5000
    })
}   

export function ToastError(title) {
    showToast('error', title)
}

export function ToastSuccess(title) {
    showToast('success', title)
}

export function ToastWarning(title) {
    showToast('warning', title)
}

export function ToastInfo(title) {
    showToast('info', title)
}