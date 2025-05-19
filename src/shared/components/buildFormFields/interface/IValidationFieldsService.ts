import { FieldErrorDto } from "../dtos/FieldErrorDto";
import { FieldsDto } from "../dtos/FieldsDto";

export interface IValidationFieldsService {
    execute: (data: Record<string, any>, fields: FieldsDto) => FieldErrorDto[]
}