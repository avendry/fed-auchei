import React, { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const CardVariants = cva(
    `
        rounded-lg px-2 py-2 flex flex-col justify-between drop-shadow-md

    `,
    {
        variants: {
            sizeCard: {
                sm: 'min-h-12',
                md: 'min-h-16',
                lg: 'min-h-36',
                xlg: 'min-h-44',
            },
            colors: {
                primary: "bg-secundary_accent_light",
            }
        },
        defaultVariants: {
            sizeCard: "md"
        }
    }
)


interface RootProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof CardVariants> {
    children: React.ReactNode
}

export const Root: React.FC<RootProps> = ({ sizeCard, colors, className, ...props }) => {
    let headerChildren, bodyChildren, footerChildren;

    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            if (typeof child.type === 'function') {
                switch (child.type?.name) {
                    case 'Header':
                        headerChildren = child;
                        break;
                    case 'Body':
                        bodyChildren = child;
                        break;
                    case 'Footer':
                        footerChildren = child;
                        break;
                }
            }
        }
    });




    return (
        <>
            <div
                className={clsx(CardVariants({ colors, sizeCard, className }))}
                {...props}
            // className="bg-secundary_accent_light rounded-lg px-2 py-2 flex flex-col min-h-16 justify-between drop-shadow-md"
            >
                <div
                >
                    {headerChildren}
                </div>
                <div
                    className="w-full"
                >
                    <p className="w-full break-words text-center max-w-[90%]">
                        {bodyChildren ? bodyChildren : props.children}
                    </p>
                </div>
                <div

                >
                    {footerChildren}
                </div>
            </div>
        </>
    )
}