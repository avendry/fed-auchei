import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"
import React, { DialogHTMLAttributes, ReactNode } from "react"


const DialogVariants = cva(
    `bg-white py-5 px-8 rounded-2xl shadow-2xl flex flex-col min-h-96 justify-between
    drop-shadow-lg
    dark:bg-primary_dark dark:shadow-primary_dark
    gap-2
    `,
    {
        variants: {
            size: {
                default: "w-[60vw]",
                sm: 'w-[40vw]',
                md: 'w-[44vw]',
                lg: 'w-[80vw]',
                xlg: 'w-[90vw]',
                none: "max-w-[95vw]"
            }
        },
        defaultVariants: {
            size: "default",
        }
    }
)


interface RootProps extends DialogHTMLAttributes<HTMLDialogElement>, VariantProps<typeof DialogVariants> {
    showDialog: boolean
    children: ReactNode
}

export const Root: React.FC<RootProps> = ({ size = "default", className, ...props }) => {
    let headerContent, bodyContent, footerContent;

    // Transforma os filhos em uma array única, evitando problemas com elementos aninhados
    const childrenArray = React.Children.toArray(props.children).flat();

    React.Children.forEach(childrenArray, (child) => {
        if (React.isValidElement(child)) {
            const childType = child.type as any;

            if (typeof childType === 'function') {
                const name = childType?.displayName || '';

                if (name === 'Header') {
                    headerContent = child;
                }
                if (name === 'Body') {
                    bodyContent = child;
                }
                if (name === 'Footer') {
                    footerContent = child;
                }
            }
        }
    });

    return (
        <dialog open={props.showDialog}>
            <div className="flex flex-col items-center justify-center h-screen w-full bg-black/40 z-50 fixed top-0 left-0 right-0 bottom-0">
                <div
                    className={clsx(DialogVariants({ size }), className)}
                >
                    {headerContent && (
                        <>
                            {headerContent}

                        </>
                    )}
                    {bodyContent && (
                        <>
                            {bodyContent}
                        </>
                    )}
                    {footerContent && (
                        <>
                            {footerContent}
                        </>
                    )}
                </div>
            </div>
        </dialog>
    );
};