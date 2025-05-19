import { Grid } from "@/shared/components/Grid/Grid"
import { FC } from "react";
import { GridFormFieldsFunctions } from "./GridFormFieldsFunctions";
import { PaginationComponent } from "@/shared/components/Grid/PaginationComponent";
import { Button } from "@/components/ui/button";
import { DialogUi } from "@/components/ui/modal";
import { BuildFormFields } from "../../BuildFormFields";


interface GridFormFieldsProps {
    label: string,
    keyName: string,
    parentValues: Record<string, any>;
    relationNameTable: string;
    uniqueId: string | number;
    icon: string;
    onChange: (gridFormValues: Record<string,any>[]) => void;
    onDelete: (row: Record<string, any>, index: number) => void;
    relationTabelId: number | string
}

export const GridFormFields: FC<GridFormFieldsProps> = (
    {
        keyName,
        label,
        uniqueId,
        icon,
        relationNameTable,
        relationTabelId,
        onChange,
        onDelete
    }
) => {
    const {
        loading, gridAttributes,
        columns, showModal,
        onAdd,
        onSave, handleClose,
        form,
        arrayFormItensRender
    } = GridFormFieldsFunctions({
        crud: keyName.split("gr_").pop() ?? "",
        onChangeGridProps: onChange,
        relationNameTable,
        relationTabelId,
        onDeleteProps: onDelete
    });

    return (
        <>
            <DialogUi.Root showDialog={showModal}>
                <DialogUi.Header>
                    <div className="flex flex-row gap-2 items-center ">
                        <span className="font-semibold opacity-80">{label}</span>
                        <i className={`${icon} opacity-60`} />
                    </div>
                </DialogUi.Header>
                <DialogUi.Body>
                    {loading ? (
                        <>
                            <h2>Carregand conteudo</h2>
                        </>
                    ) : (
                        <>
                            {showModal && (
                                <>
                                    <BuildFormFields
                                        fieldSchema={gridAttributes.fields}
                                        crud={keyName.split("gr_").pop() ?? ""}
                                        dataValues={form}
                                        onSave={onSave}
                                        handleDelete={() => { }}
                                        handleClose={handleClose}
                                        method="add"
                                        id={uniqueId}
                                        isModal={true}
                                    />
                                </>
                            )}
                        </>
                    )}
                </DialogUi.Body>
            </DialogUi.Root>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between px-1 items-center">
                    <h2 className="font-semibold opacity-60">{label}</h2>
                    <Button onClick={onAdd}>Adicionar</Button>
                </div>
                <Grid
                    loading={loading}
                    columns={columns}
                    data={arrayFormItensRender || []}
                    paginationChildren={
                        <PaginationComponent
                            className="mt-2 h-14"
                            nextPage={() => { }}
                            previousPage={() => { }}
                            totalPages={gridAttributes.totalPages}
                            atualPage={gridAttributes.atualPage}
                            loading={loading}
                        />
                    }
                />
            </div>
        </>
    )
}