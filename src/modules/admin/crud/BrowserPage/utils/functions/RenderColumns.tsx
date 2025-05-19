import { ColumnDef } from "@tanstack/react-table"
import { SchemaToParsed } from '@/shared/functions/genericFormFieldsComponents/SchemaToParsed';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";




interface IRenderColumnsProps {
    inLineRender?: boolean;
    fieldsSchema: Record<string, any>
    onEdit?: (params: { row: Record<string, any>, index?: number }) => void;
    onDelete?: (params: { row: Record<string, any>, index?: number }) => void;
}



export const renderColumns = (params: IRenderColumnsProps): ColumnDef<any>[] => {
    const { fieldsSchema, onDelete } = params;
    const fields = fieldsSchema
    const outputCells: ColumnDef<any>[] = [];
    Object.entries(fields).forEach(([key, value]) => {
        const fieldUnitSchema: any = value;
        if (fieldUnitSchema.browserColumn) {
            outputCells.push(
                {
                    accessorKey: key,
                    header: () => (
                        <div
                            className="text-center"
                        >
                            {fieldUnitSchema.label}
                        </div>
                    ),
                    cell: ({ row }) => {
                        return (
                            <div
                                className="text-center"
                            >
                                {SchemaToParsed(
                                    {
                                        fieldType: fieldUnitSchema.type,
                                        value: row.getValue(key),
                                        key: key,
                                        dataOriginal: row.original
                                    }
                                )}
                            </div>
                        )
                    }
                }
            )
        }
    })
    outputCells.push(
        {
            id: "actions",
            header: () => (
                <div
                    className="text-center"
                >
                    Ações
                </div>
            ),
            cell: ({ row }) => {
                const outputActions = [];
                outputActions.push(
                    <>
                        <div
                            className="text-center cursor-pointer"
                            onClick={() => {
                                if (params.onEdit) {
                                    params.onEdit(
                                        {
                                            row: row.original,
                                            index: row.index
                                        }
                                    )
                                }
                            }}
                        >
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger><i className="fas fa-pen text-gray-500 hover:text-gray-300"></i></HoverCardTrigger>
                                <HoverCardContent

                                    className="w-auto"
                                >
                                    Editar Registro
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </>
                )
                if (onDelete) {
                    outputActions.push(
                        <div
                            className="text-center cursor-pointer"
                            onClick={() => {
                                if (onDelete) {
                                    onDelete(
                                        {
                                            row: row.original,
                                            index: row.index
                                        }
                                    )
                                }
                            }}
                        >
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger><i className="fas fa-trash-alt text-gray-500 hover:text-gray-300"></i></HoverCardTrigger>
                                <HoverCardContent

                                    className="w-auto"
                                >
                                    Deletar Registro
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    )
                }
                return (
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {outputActions}
                    </div>
                );
            }
        }
    )
    return outputCells;
}