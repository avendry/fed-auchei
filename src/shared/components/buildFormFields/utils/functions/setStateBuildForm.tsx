import { ISetStateBuildForm } from "@/shared/interfaces/ISetStateBuildForm";

export const setStateBuildForm = (
    setLoadingsFields: (fields: string[]) => void,
    onChangeInput: (inputValue: any, columnName: string) => void,
    setFieldsSchemaManipulated: (fieldsSchema: Record<string, any>) => void
): ISetStateBuildForm => {
    return {
        setStateProperty(fieldOrState: string | object, value: any = null) {
            // setLoading(true)
            if (value === null || typeof fieldOrState == "object") {

            } else {
                const obj: any = {};
                obj[fieldOrState] = value;
                setLoadingsFields(value);
            }
        },
        setExternalFieldValue(fieldName: string, fieldValue: any) {
            onChangeInput(fieldValue, fieldName);
        },
        setFieldProperty(fieldName: string, fieldProperty: string, fieldValue: any) {
            setFieldsSchemaManipulated((prevValues: any) => {
                prevValues[fieldName][fieldProperty] = fieldValue;
                return { ...prevValues}
            });
        }
    }
}