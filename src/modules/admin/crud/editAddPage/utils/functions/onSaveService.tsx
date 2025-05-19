import { AxiosInstance, AxiosPromise } from "axios";
import { IOnsaveService } from "../interfaces/ISaveFormBuilder";


interface ISaveFormBuilderParams {
    formValues: Record<string, any>,
    crud: string,
    axiosInstance: AxiosInstance,
    Ulid: string
}

export const onSaveService = (
    {
        formValues,
        crud,
        axiosInstance,
        Ulid
    }: ISaveFormBuilderParams): IOnsaveService => {
    return {
        insert(): AxiosPromise {
            return axiosInstance.post(`/api/v1/${crud}/insert`, {
                transactionUlid: Ulid,
                data: formValues
            })
        },
        update({id}): AxiosPromise {
            return axiosInstance.put(`/api/v1/${crud}/${id}/update`, {
                data: formValues
            });
        },
    }
}