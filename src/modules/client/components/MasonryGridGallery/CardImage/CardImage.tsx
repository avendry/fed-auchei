import { ICardImage } from "@/shared/interfaces/ICardImage"
import clsx from "clsx"
import { FC } from "react"



export const CardImage: FC<ICardImage> = ({alt,src,className}) => {
    return (
        <>
            <div className="group">
                <img
                    className={clsx('h-auto max-w-full rounded-sm object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg cursor-pointer', className)}
                    src={src}
                    alt={alt}
                    loading="lazy"
                />
            </div>
        </>
    )
}