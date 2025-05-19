import { ViewImageOriginalStoreDto } from "../dtos/ViewImageOriginalStoreDto";

export interface IViewImageOriginalStore {
    showModal: boolean;
    viewImageData: ViewImageOriginalStoreDto;
    setShowModal: (value: boolean) => void;
    setViewImageData: (data: ViewImageOriginalStoreDto) => void;
}