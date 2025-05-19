import { ToastContainerProps } from "react-toastify";

export interface INotificationContextType {
    success: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    info: (message: string) => void;
    customize: (message: string, type: "success" | "error" | "warn" | "info", options: ToastContainerProps) => void;
}