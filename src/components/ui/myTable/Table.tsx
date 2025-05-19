import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect } from "react";
import { useTableStore } from "./tableStore";


const TableVariants = cva(
    `
        flex flex-row w-full px-5 py-1 
        h-[100%]  bg-slate-50 rounded-md drop-shadow-md overflow-x-auto no-scrollbar
    `,
    {
        variants: {
            // size: {
            //     default: "w-full",
            // }
        }
    }
)


interface TableProps extends VariantProps<typeof TableVariants> {
    children: React.ReactNode;
    data: any[];
    className?: string;
    autoSize?: boolean;
}


export const Table: React.FC<TableProps> = (
    {
        data,
        children
    }
) => {
    // let TableCell;
    const TableHeaderCell: string | number | boolean | any[] | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined = [];
    const TableCell: React.ReactElement<any, string | React.JSXElementConstructor<any>> | any[] = []
    const { setData } = useTableStore();

    useEffect(() => {
        console.log(data)
        setData(data)
    }, [data, setData])


    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            if (typeof child.type === 'function') {
                if (child.type?.name === 'Column') {
                    for (const item of child.props.children) {
                        if (item.type.name === 'TableHeaderCell') {
                            TableHeaderCell.push(item)
                        }
                        if (item.type.name === 'TableCell') {
                            TableCell.push(item)
                        }
                    }
                }
            }
        }
    })

    console.log({ data })

    return (
        <div
            className="w-full h-[100%] bg-slate-50 rounded-md drop-shadow-md no-scrollbar"
        >
            <table
                // className="p-5 table-fixed bg-orange-300 w-full overflow-auto"
                className="table-fixed w-full "
            >
                <thead>
                    <tr

                    >
                        {TableHeaderCell}
                    </tr>
                </thead>
                <tbody>
                    {/* {data.map((row, index) => {
                            console.log('teste', row)
                            return (
                                <>
                                    <tr
                                        key={index}
                                    >
                                        {TableCell.map((cell, indexCell) => {
                                            return(
                                                <>
                                                    {cell}
                                                </>
                                            )
                                        })}
                                    </tr>
                                    {row.}
                                </>
                            )
                        })} */}
                    <tr>
                        <td>asad</td>
                        <td>bbb</td>
                    </tr>
                    <tr>
                        <td>asad</td>
                        <td>bbb</td>
                    </tr>
                    {TableCell}
                </tbody>
            </table>
        </div>
    )
}