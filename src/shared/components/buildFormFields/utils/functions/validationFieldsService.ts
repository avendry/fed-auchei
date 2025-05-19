import { FieldsDto } from './../../dtos/FieldsDto';
import { FieldErrorDto } from "../../dtos/FieldErrorDto";
import { IValidationFieldsService } from "../../interface/IValidationFieldsService";

export const validationFieldsService = (

): IValidationFieldsService => {
    const validateRequired = (isRequired: boolean, value: any): boolean => {
        return isRequired && [null,undefined].includes(value);
    }

    return {
        execute(data: Record<string, any>, fields: FieldsDto) {
            const arrayObjReturn: FieldErrorDto[] = [];
            for (const key in fields) {
                if (fields.hasOwnProperty(key)) {
                    const field = fields[key];
                    if (!key.includes('_created_by')) {
                        if (field.type !== 'password') {
                            if (validateRequired(field.required, data[key])) {
                                arrayObjReturn.push(
                                    {
                                        fieldName: key,
                                        errorDescription: `${field.label} é obrigatório!`
                                    }
                                )
                            }
                        }
                    }
                }
            }
            return arrayObjReturn
        }
    }
}