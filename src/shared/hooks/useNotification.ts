import { useContext } from "react";
import { NotificationContext } from "../components/Notification/NotificationProvider";
import { INotificationContextType } from "../interfaces/INotificationContextType";

export const useNotification = (): INotificationContextType => {
    const context = useContext(NotificationContext);
    if(!context) {
        throw new Error("useNotification é usado fora do NotificationProvider")
    }
    return context;
}