import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"
import React from "react"



const PanelVariants = cva(
    `
        rounded-md p-3 flex flex-col
    `,
    {
        variants: {
            bordered: {
                true: 'border-2 border-slate-300/50'
            }
        }
    }
)


interface RootProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof PanelVariants> {
    children: React.ReactNode
    className?: string,
    header?: React.ReactNode
}


export const Root: React.FC<RootProps> = (
    {
        bordered,
        children,
        className,
        header,
        ...props
    }
) => {
    // React.Children.forEach(children, (child) => {
    //     if (React.isValidElement(child)) {
    //         console.log('completo', child)
    //         console.log(child.type)
    //         if (typeof child.type === 'function') {
    //             if (child.type?.name === 'Title') {
    //                 tittleContent = child;
    //             }
    //         }
    //     } else {
    //         console.log('incompleto', child)
    //     }
    // });

    return (
        <div
            {...props}
            className={clsx(PanelVariants({ bordered }), className)}
        >
            <div>
                {header && header}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}