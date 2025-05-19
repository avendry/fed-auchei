import { AxiosInstance, AxiosPromise } from "axios";
import { IOnSaveUseCase } from "../../interface/IOnSave";
import { FieldsDto } from "../../dtos/FieldsDto";
import { FieldErrorDto } from "../../dtos/FieldErrorDto";

export class OnSaveService implements IOnSaveUseCase {
    private axiosInstance: AxiosInstance;


    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }


    insert(data: Record<string, any>, tableName: string, _fields: FieldsDto, Uuid: string): AxiosPromise {
        return this.axiosInstance.post(`/api/v1/${tableName}/save`, {
            transactionUuid: Uuid,
            data: data
        })
    }

    validationFieldsValues(data: Record<string, any>, _fields: FieldsDto): FieldErrorDto[] {
        Object.entries(data).forEach(([values, teste], index) => {
            console.log({ values })
            console.log({ teste })
            console.log({ index })

        })

        return [];
    }

}