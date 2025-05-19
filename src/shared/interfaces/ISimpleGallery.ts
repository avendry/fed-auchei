export interface ISimpleGalley {
    images: string[];
    onImageClick: (imgElement: HTMLImageElement) => void;
}