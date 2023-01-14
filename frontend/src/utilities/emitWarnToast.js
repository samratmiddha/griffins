import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emitWarnToast = (message) => {
    toast.warn(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export default emitWarnToast