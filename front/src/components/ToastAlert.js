import { toast } from 'react-toastify';

export const toastAlert = (tostKind, message) => {
    const toastSetup =  {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }
    
    if( tostKind === "success"){
        return toast.success(message, toastSetup)
    }
    if (tostKind === "error"){
        return  toast.error(message, toastSetup)
    }
    
    if (tostKind === "warning"){
        return toast.warn(message, toastSetup)
    }
    
    if (tostKind === "info"){
       return toast.info(message, toastSetup)
    }
         
};
