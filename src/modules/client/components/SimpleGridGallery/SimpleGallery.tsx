// import { Checkbox } from "@/components/ui/checkbox";
import { ISimpleGalley } from "@/shared/interfaces/ISimpleGallery";
import { FC } from "react";
// import { SimpleGalleryFunctions } from "./SimpleGalleryFunctions";

export const SimpleGallery: FC<ISimpleGalley> = ({ images, onImageClick }) => {
    // const { handleViewImageExpanded } = SimpleGalleryFunctions();

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 w-full">
            {images.map((src, index) => (
                <div key={index} className="group relative">
                    <img
                        className="h-40 md:h-80 w-full max-w-full rounded-lg object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg cursor-pointer"
                        src={src}
                        alt="gallery-photo"
                        loading="lazy"
                        onClick={(e) => onImageClick(e.currentTarget)}
                        // onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                    />
                    {/* <div className="absolute top-0 w-full rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-top-[14px] h-9 flex flex-row group-hover:z-50 z-0">
                        <div className="bg-emerald-900 w-[20%] rounded-tl-lg rounded-br-2xl shadow-lg justify-center content-center items-center text-center">
                            <Checkbox className="border-white" key={`checkbox${index}`} />
                        </div>
                        <div className="bg-emerald-700/60 rounded-tr-lg w-[80%] h-[60%]">
                        </div>
                    </div> */}
                </div>
            ))}
        </div>
    )
}