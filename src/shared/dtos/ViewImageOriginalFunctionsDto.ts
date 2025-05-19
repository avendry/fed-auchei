import { ViewImageOriginalStoreDto } from "./ViewImageOriginalStoreDto";

export interface ViewImageOriginalFunctionsDto {
    keyImage: string | null;
    imageTitle: string | null;
    setShowModal: (value: boolean) => void;
    setViewImageData: (data: ViewImageOriginalStoreDto) => void;
}