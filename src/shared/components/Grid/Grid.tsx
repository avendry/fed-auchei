import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import clsx from "clsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[];
    paginationChildren?: React.ReactNode;
    loading?: boolean;
}

export function Grid<TData, TValue>({
    columns,
    data,
    paginationChildren,
    loading
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <>
            <div>
                <div className="rounded-md border bg-white">
                    <Table
                        className={clsx(loading ? "animate-pulse h-96" : "", "transition-all duration-1000")}
                    >
                        {!loading ? (
                            <>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                Sem resultados.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </>
                        ) : (
                            <>
                                <TableBody
                                    className="bg-gray-200"
                                >
                                    {Array.from({ length: 1 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </>
                        )}

                    </Table>
                </div>
                <div
                    className="flex w-full"
                >
                    {paginationChildren && (
                        <>
                            {paginationChildren}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
