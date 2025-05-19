import { create } from "zustand";
import { ViewImageOriginalStoreDto } from "@/shared/dtos/ViewImageOriginalStoreDto";
import { IViewImageOriginalStore } from "@/shared/interfaces/IViewImageOriginalStore";


const initialValue: ViewImageOriginalStoreDto = {
    keyImage: null,
    title: ''
}

export const ViewImageOriginalStore = create<IViewImageOriginalStore>((set) => {
    return {
        showModal: false,
        viewImageData: initialValue,
        setShowModal: (value: boolean) => set(() => ({ showModal: value })),
        setViewImageData: (data: ViewImageOriginalStoreDto) => set(() => ({ viewImageData: data })),
    }
})