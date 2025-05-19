import { AxiosPromise } from "axios";
import { FieldsDto } from "../dtos/FieldsDto";
import { FieldErrorDto } from "../dtos/FieldErrorDto";

export interface IOnSaveUseCase {
    insert(data: Record<string,any>, tableName: string, fields: FieldsDto, Uuid: string): AxiosPromise;
    validationFieldsValues(data: Record<string,any>, fields: FieldsDto, aaa: string): FieldErrorDto[];
}