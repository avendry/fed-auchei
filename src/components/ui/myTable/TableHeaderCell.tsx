import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const HeaderCellVariants = cva(
    `
        font-semibold cursor-pointer border-b-2 p-2
        flex-nowrap overflow-hidden 
    `,
    {
        variants: {

        }
    }
)

interface HeaderCellProps extends VariantProps<typeof HeaderCellVariants> {
    children: React.ReactNode;
    onSort?: (sortKey: string) => void;
    sortKey?: string;
    className?: string;
}


export const TableHeaderCell: React.FC<HeaderCellProps> = (
    {
        children,
        onSort,
        className,
        sortKey
    }
) => {

    return (
        <th
            className={clsx(HeaderCellVariants({}), className)}
            // className=""
            onClick={() => {
                if (onSort && sortKey) {
                    onSort(sortKey)
                }
            }}
        >
            {children}
        </th>
    )
}