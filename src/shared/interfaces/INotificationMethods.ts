import { ReactNode } from "react";
import { ToastContainerProps } from "react-toastify";

export interface INotificationMethods {
    success: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    info: (message: string) => void;
    customize: (message: string | ReactNode, type: "success" | "error" | "warn" | "info", options: ToastContainerProps) => void;
}