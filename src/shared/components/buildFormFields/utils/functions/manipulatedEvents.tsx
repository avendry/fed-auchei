import * as EventsHolder from "@/shared/events/EventHolder";
import { IManipulatedEventsFunctions } from "@/shared/interfaces/IManipulatedEventsFunctions";
import { ISetExtenalFieldValue } from "@/shared/interfaces/ISetExtenalFieldValue";
import { ISetFieldProperty } from "@/shared/interfaces/ISetFieldProperty";
import { ISetStateProperty } from "@/shared/interfaces/ISetStateProperty";
import { camelCase, upperFirst } from "lodash";
import { singular } from "pluralize";

export const maipulatedEventsFunctions = (
    setStateProperty: ISetStateProperty,
    setExternalFieldValue: ISetExtenalFieldValue,
    setFieldProperty: ISetFieldProperty,
    formValues: Record<string,any>,
    dataInitialValues?: Record<string,any> | null
): IManipulatedEventsFunctions => {
    const eventHolder: any = EventsHolder;
    return {
        getInitialEvent(crudName, method) {
            const evenClassName = `${upperFirst(singular(camelCase(crudName)))}Events`;
            if (eventHolder[evenClassName]) {
                const eventPage = eventHolder[evenClassName];
                const instancedEvent = new eventPage(
                    {
                        fieldName: null,
                        setState: setStateProperty,
                        setFieldValue: setExternalFieldValue,
                        setFieldProperty
                    }
                );
                switch (method) {
                    case "add":
                        if (instancedEvent['onInit']) {
                            instancedEvent.onInit()
                        }
                        break;
                    case "edit":
                        if (instancedEvent.onLoad) {
                            instancedEvent.onLoad(formValues)
                        }
                        break;

                }
            }
        },
        checkExistingEvent(fieldName) {
            const evenClassName = `${upperFirst(singular(camelCase(fieldName)))}Events`;
            return !!eventHolder[evenClassName]
        },
        getEventByField(fieldName) {
            const eventList: any = EventsHolder;
            const evenClassName = `${upperFirst(singular(camelCase(fieldName)))}Events`;
            const event = eventList[evenClassName];
            return new event({
                fieldName: fieldName,
                setState: setStateProperty,
                setFieldValue: setExternalFieldValue,
                setFieldProperty,
                parentFormValues: formValues,
                initialParentFormValues: dataInitialValues
            });
        },
    }
}