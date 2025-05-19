import { AttributeDto } from "../dtos/AttributeDto";

export interface IgetLocalStorage {
    getStorageAttributes: () => AttributeDto | null;
}