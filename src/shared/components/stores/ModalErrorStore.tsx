import { AxiosErrorDto } from '@/shared/dtos/AxiosErrorDto';
import { IModalErrorStore } from '@/shared/interfaces/IModalErrorStore';
import { create } from 'zustand';


const initialErrorData: AxiosErrorDto = {
    error: '',
    id_error: 0,
    location: '',
    title: ''
};


export const useModalErrorStore = create<IModalErrorStore>((set) => {
    return {
        showModalError: false,
        errorData: initialErrorData,
        setShowModalError: (value: boolean) => set(() => ({ showModalError: value })),
        setErrorData: (data: AxiosErrorDto) => set(() => ({ errorData: data })),
    }
})