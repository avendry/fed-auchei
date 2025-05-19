import { FC } from "react";
import { MansoryGridGalleryFunction } from "./MansoryGridGalleryFunctions";
import { IMansoryGridGallery } from "@/shared/interfaces/IMansoryGridGallery";
import { Column } from "./Column/Column";

export const MansoryGridGallery: FC<IMansoryGridGallery> = ({images,columns = 4}) => {
    const { divideImages } = MansoryGridGalleryFunction();
    const divideImagesExe = divideImages(images,columns)

    return (
        <>
            <div className={`grid grid-cols-2 gap-4 md:grid-cols-${columns} pb-5 items-start`}>
                {divideImagesExe.map((columnsImages, index) => (
                    <Column key={index} images={columnsImages} />
                ))}
            </div>
        </>
    )
}