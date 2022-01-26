import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const ToastAlertContainer = () => {
       return (<div> 
                <ToastContainer 
                        theme="dark"
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
                </div> 
    )
}
  