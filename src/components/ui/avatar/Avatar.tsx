import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FC, HTMLAttributes } from "react";


const avatarVariants = cva(
    `
        border-2 border-primary_light drop-shadow-md items-center justify-center flex circle
    `,
    {
        variants: {
            size: {
                default: "w-14 h-14",
                sm: "w-10 h-10",
                md: "w-16 h-16",
                lg: "w-20 h-20",
                xlg: "w-24 h-24",
                xxlg: "w-40 h40"
            },
            rounded: {
                circle: "rounded-full",
                square: "rounded-md",
            }
        },
        defaultVariants: {
            size: "default",
            rounded: "square"
        }
    }
)



interface IAvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
    children?: React.ReactNode,
    src: string;
    alt?: string;
}


export const Avatar: FC<IAvatarProps> = ({ children, size, rounded, ...props }) => {

    return (
        <>


            {children ? (
                <>
                    <div
                        className={clsx(avatarVariants({ size, rounded }), props.className, 'items-center justify-center flex')}
                    >
                        {children}
                    </div>
                </>
            ) : (
                <>
                    <img
                        className={clsx(avatarVariants({ size, rounded }), props.className)}
                        src={props.src}
                        alt={props.alt}
                    />
                </>

            )}
        </>
    )
}
