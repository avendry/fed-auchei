import { create } from "zustand";
import { INotificationStore } from "../interfaces/INotificationStore";
import { toast } from "react-toastify";


export const useNotificationStore = create<INotificationStore>(() => ({
    notify: {
        success: (message: string) => {
            toast.success(message);
        },
        error: (message: string) => {
            toast.error(message);
        },
        info: (message: string) => {
            toast.info(message);
        },
        warn: (message: string) => {
            toast.warning(message);
        },
        customize(message, type, options) {
            toast[`${type}`](message, options)
        },
    },
}));