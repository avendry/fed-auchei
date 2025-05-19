import { AxiosErrorDto } from "../dtos/AxiosErrorDto";

export interface IModalErrorStore {
    showModalError: boolean;
    errorData: AxiosErrorDto;
    setShowModalError: (value: boolean) => void;
    setErrorData: (data: AxiosErrorDto) => void;
}