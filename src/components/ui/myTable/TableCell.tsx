import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useTableStore } from "./tableStore";

const CellVariants = cva(
    `
       flex flex-col flex-wrap
    `,
    {
        variants: {}
    }
);

interface CellProps extends VariantProps<typeof CellVariants> {
    dataKey: string;
    className?: string;
}


export const TableCell: React.FC<CellProps> = (
    {
        dataKey,
    }
) => {
    const { data } = useTableStore();
    console.log({ data });

    return (
        <>
            {data.map((row, index) => (
                <tr key={index}>
                    {Object.entries(row).map(([key, value]) => {
                        if (key === dataKey) {
                            // Verifica se 'value' é do tipo string, number, ou se converte para string
                            const displayValue = typeof value === 'string' || typeof value === 'number'
                                ? value
                                : JSON.stringify(value); // Converte para string se for outro tipo

                            return (
                                <td key={key}>
                                    {displayValue}
                                </td>
                            );
                        }
                        return null;
                    })}
                </tr>
            ))}
        </>
    );
};
