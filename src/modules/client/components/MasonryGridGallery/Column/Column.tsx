import { TColumnProps } from "@/shared/types/TColumnProps";
import { FC } from "react";
import { CardImage } from "../CardImage/CardImage";

export const Column: FC<TColumnProps> = ({ images }) => {

    return (
        <div className="grid gap-4">
            {images.map((src, index) => (
                <CardImage key={index} src={src} alt={`gallery-photo-${index}`} />
            ))}
        </div>
    )
}