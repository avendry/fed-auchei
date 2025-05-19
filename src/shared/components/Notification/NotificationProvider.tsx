import { INotificationContextType } from "@/shared/interfaces/INotificationContextType"
import { INotificationProviderProps } from "@/shared/interfaces/INotificationProviderProps";
import { createContext } from "react"
import { toast, ToastContainer, ToastContainerProps } from "react-toastify";

export const NotificationContext = createContext<INotificationContextType | undefined>(undefined);

const toastConfig: ToastContainerProps = {
    autoClose: 2500,
    closeOnClick: true,
    theme: "colored",
}

export const NotificationProvider: React.FC<INotificationProviderProps> = ({ children }) => {
    const notify: INotificationContextType = {
        error(message) {
            toast.error(message,toastConfig)
        },
        success(message) {
            toast.success(message,toastConfig);
        },
        warn(message) {
            toast.warn(message, toastConfig);
        },
        info(message) {
            toast.info(message, toastConfig)
        },
        customize(message, type, options) {
            toast[`${type}`](message, options)
        },
    }

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <ToastContainer />
        </NotificationContext.Provider>
    )
}

