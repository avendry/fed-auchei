import Axios from "@/shared/utils/Axios";
import { AxiosResponse } from "axios";
import { useState, useEffect, useMemo } from "react";
import { IGridAttributes } from "@/shared/interfaces/IGridAttributes";
import { ColumnDef } from "@tanstack/react-table";
import { renderColumns } from "@/modules/admin/crud/BrowserPage/utils/functions/RenderColumns";
import { useParams } from "react-router-dom";



interface GridFormFieldsFunctions {
    crud: string
}


export const GridFormFieldsFunctions = ({
    crud
}: GridFormFieldsFunctions) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const paramsUrl = useParams();
    const [gridAttributes, setGridAtributes] = useState<IGridAttributes>({
        items: [],
        atualPage: 0,
        totalItems: 0,
        totalPages: 0,
        perPage: 10,
        fields: {},
        globals: {}
    });


    useEffect(() => {
        getFields(
            {
                callback: ({ schema }: { schema: Record<string, any> }) => {
                    if (paramsUrl.method === "edit") {
                        getData(
                            {
                                schema
                            }
                        )
                    } else {
                        const { fields, ...rest } = schema;
                        setGridAtributes(
                            {
                                ...gridAttributes,
                                fields,
                                globals: rest,
                                items: [],
                                totalItems: 0,
                                totalPages: 0,
                                atualPage: 0
                            }
                        )
                        setLoading(false)
                    }
                }
            }
        )
    }, [crud]);

    const onEdit = (params: { row: Record<string, any> }) => {
        console.log({ params });
        setShowModal(true)
    }

    const onAdd = () => {
        setShowModal(true)
    }



    const getFields = ({ callback }: { callback?: ({ schema }: { schema: Record<string, any> }) => void }) => {
        Axios
            .get(`/api/v1/get/${crud}/fields`)
            .then((reponse: AxiosResponse<{ schema: Record<string, any> }>) => {
                const { $GLOBALS } = reponse.data.schema;
                if (callback) callback(
                    {
                        schema: $GLOBALS
                    }
                )
            })
            .catch(() => {
                setGridAtributes(
                    {
                        items: [],
                        atualPage: 0,
                        totalItems: 0,
                        totalPages: 0,
                        perPage: 10,
                        fields: {},
                        globals: {}
                    }
                )
            })
    }


    const getData = ({ schema }: { schema: Record<string, any> }) => {
        const { fields, ...rest } = schema;
        Axios
            .get(`/api/v1/${crud}/list`)
            .then((response: AxiosResponse<{
                itens: Record<string, any>[],
                pagination: {
                    currentPage: number,
                    perPage: number,
                    totalPages: number,
                    totalItems: number
                }
            }>) => {
                const { data } = response;
                setGridAtributes(
                    {
                        ...gridAttributes,
                        fields,
                        globals: rest,
                        items: data.itens,
                        totalItems: data.pagination.totalItems,
                        totalPages: data.pagination.totalPages,
                        atualPage: data.pagination.currentPage
                    }
                )
            })
            .catch(() => {
                setGridAtributes(
                    {
                        items: [],
                        atualPage: 0,
                        totalItems: 0,
                        totalPages: 0,
                        perPage: 10,
                        fields: {},
                        globals: {}
                    }
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const columns: ColumnDef<any, any>[] = useMemo(() => {
        if (gridAttributes.fields) {
            return renderColumns({
                fieldsSchema: gridAttributes.fields,
                onEdit(params) {
                    onEdit(params)
                },
            })
        }
        return [];
    }, [gridAttributes.fields]);

    return {
        loading,
        gridAttributes,
        columns,
        showModal,
        setShowModal,
        onAdd
    }
}