import { cva, type VariantProps } from "class-variance-authority";
import React  from "react";


const ColumnVariants = cva(
    `
        bg-orange-500
        flex flex-col
        flex-nowrap
        
    `,
    {
        variants: {
            align: {
                left: "text-left",
                right: "text-right",
                center: "text-center"
            },
        }
    }
)



interface ColumnProps extends VariantProps<typeof ColumnVariants> {
    children?: React.ReactNode;
    className?: string;
}


export const Column: React.FC<ColumnProps> = (
    {
        children
    }
) => {
    return (
        <div
            // className={clsx(ColumnVariants({ align }), className)}
            // className="w-full"
        >
            {children}
        </div>
    )
}


