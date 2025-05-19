import { MethodType } from "@/modules/admin/crud/editAddPage/utils/interfaces/IEditAddPage";
import { Event } from "../events/Event";

export interface IManipulatedEventsFunctions {
    getInitialEvent: (crudName: string, method: MethodType) => void;
    checkExistingEvent: (fieldName: string) => boolean;
    getEventByField: (fieldName: string) => Event;
}