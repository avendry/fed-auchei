import { ButtonHTMLAttributes } from "react"
import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority"
import React from "react";
import { SpinnerUiMv } from "../spinnerUiMv/Spinner";


const buttonVariant = cva(
    `max-w-screen-md max-h-screen rounded-md
    bg-accent_light text-background_light
    dark:bg-primary_dark dark:text-background_light
    flex
    items-center
    justify-center
    container mx-auto
    p-2
    drop-shadow-md
    whitespace-nowrap`,
    {
        variants: {
            variant: {
                default: "bg-accent_light text-background_light hover:bg-accent_light/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90",
                destructive:
                    "bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90",
                outline:
                    "border border-stone-200 bg-white hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50",
                secondary:
                    "bg-stone-100 text-stone-900 hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80",
                ghost: "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-50",
                link: "text-stone-900 underline-offset-4 hover:underline dark:text-stone-50",
                approved: "bg-green-500"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
            colorDefault: {
                default: "bg-accent_light text-background_light"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {
    children: React.ReactNode,
    loading?: boolean
}

const ButtonUiMv: React.FC<ButtonProps> = ({ className, variant, size = "sm",  loading = false, children, ...props }) => {
    
    return (
        <button
            {...props}
            className={clsx(buttonVariant({ variant, size, className}))}
            disabled={loading ? true : false}
        >
            {loading ? <SpinnerUiMv /> : children}
        </button>
    )
}

export { ButtonUiMv, buttonVariant }