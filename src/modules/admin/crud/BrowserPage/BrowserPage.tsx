import { Grid } from "@/shared/components/Grid/Grid"
import { useParams } from "react-router-dom";
import { renderColumns } from "./utils/functions/RenderColumns"
import { InputSearch } from "@/shared/components/inputSearch/InputSearch";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { PaginationComponent } from "@/shared/components/Grid/PaginationComponent";
import Axios from "@/shared/utils/Axios";
import { AxiosResponse } from "axios";
import { singular } from "pluralize";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";
import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv";
import { IGridAttributes } from "@/shared/interfaces/IGridAttributes";
import { filter } from "lodash";
import { useGlobalAtributeStore } from "@/shared/stores/globalAttributeStore";

export const BrowserPage = () => {
    // const and hooks
    const { crud } = useParams<{ module: string, crud: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { contextData } = useGlobalAtributeStore();


    const [gridAttributes, setGridAtributes] = useState<IGridAttributes>({
        items: [],
        atualPage: 0,
        totalItems: 0,
        totalPages: 0,
        perPage: 10,
        fields: {},
        globals: {}
    });
    const [singularNameView, setSingularNameView] = useState<string>("");
    const [loading, setLoading] = useState(true);


    // useEffects
    useEffect(() => {
        getFields(
            {
                callback: ({ schema }: { schema: Record<string, any> }) => {
                    getData(
                        {
                            schema
                        }
                    )
                }
            }
        )
    }, [crud])

    useEffect(() => {
        setLoading(true)
    }, [location])

    const renderNameModule = () => {
        if (contextData.menus) {
            const filteredMenu = filter(contextData.menus.menus, { 'menu_slug': params.crud })[0];
            if(filteredMenu) {
                return filteredMenu.menu_name;
            }
        }

        return '';
    }


    // arrow functions
    const getFields = ({ callback }: { callback?: ({ schema }: { schema: Record<string, any> }) => void }) => {
        Axios
            .get(`/api/v1/get/${crud}/fields`)
            .then((reponse: AxiosResponse<{ schema: Record<string, any> }>) => {
                const { $GLOBALS } = reponse.data.schema;
                setSingularNameView($GLOBALS.singular_name)
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

    const onEdit = (params: { row: Record<string, any> }) => {
        if (crud) {
            const singularNameCrud = singular(crud);
            navigate(`${location.pathname}/${params.row[`${singularNameCrud}_id`]}/edit`)
        }
    }

    const onAdd = () => {
        if (crud) {
            navigate(`${location.pathname}/add`)
        }
    }




    const previousPageGrid = () => {

    }


    const nextPageGrid = () => {

    }


    // renders
    return (
        <>
            <div
                className="flex flex-col gap-2"
            >
                <div
                    className="grid grid-cols-3 justify-between p-3 bg-white rounded-sm border items-center"
                >
                    <div
                    // className="bg-slate-500 rounded-md"
                    // className=""
                    >
                        <InputSearch placeholder="pesquisar por..." />
                    </div>
                    <div
                        className="flex justify-center"
                    >
                        <p>
                            Listagem de <span className="font-semibold">{renderNameModule()}</span>
                        </p>
                    </div>
                    <div
                        className="flex justify-end flex-row "
                    >
                        <div
                            className="flex flex-row gap-2"
                        >
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger>
                                    <ButtonUiMv
                                        // color="green"
                                        className="w-10 bg-green-600"
                                        onClick={onAdd}
                                    >
                                        <Plus size={16} />
                                    </ButtonUiMv>
                                </HoverCardTrigger>
                                <HoverCardContent

                                    className="w-auto"
                                >
                                    Adicionar Novo {singularNameView}
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>
                <Grid
                    data={gridAttributes.items} columns={renderColumns(
                        {
                            fieldsSchema: gridAttributes.fields,
                            onEdit(params) {
                                onEdit(params)
                            },
                        }
                    )}
                    paginationChildren={
                        <PaginationComponent
                            className="mt-2 h-14"
                            nextPage={nextPageGrid}
                            previousPage={previousPageGrid}
                            totalPages={gridAttributes.totalPages}
                            atualPage={gridAttributes.atualPage}
                            loading={loading}
                        />
                    }
                    loading={loading}
                />

            </div>

        </>
    )
}