import { AxiosInstance, AxiosPromise } from "axios";

export const DeletedItemHttp = (
    axios: AxiosInstance,
    acrud: string
) => {
    return {
        execute(id: number): AxiosPromise {
            console.log({id})
            return axios.delete(`/api/v1/${acrud}/${id}/delete`)
        }
    }
};