import { NavigateProps } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Globals } from "@/shared/utils/Globals";
import { useParams } from "react-router-dom";
import { useGlobalAtributeStore } from "@/shared/stores/globalAttributeStore";
import _ from "lodash";
import { Panel } from "@/components/ui/panel";
import * as DashboardCustom from "./dashboardViews/DashboardHolder";
import { singular } from "pluralize";
import React from "react";

interface IDashboardPageProps extends NavigateProps {

}


export const DashboardModulePage = ({ ...props }: IDashboardPageProps) => {
    const params = useParams();
    const { contextData } = useGlobalAtributeStore();

    const renderNameModule = () => {
        const nameModule = _.filter(contextData.menus.modules, { 'module_slug': params.module })[0];
        return nameModule?.module_name
    }

    const renderDashboardModule = () => {
        const customNameModule = `${singular(_.upperFirst(params.module))}DashboardCustom`;
        const viewCustom: any = DashboardCustom;
        const viewHolder = viewCustom[customNameModule];
        if (viewHolder) {
            return (
                <Panel.Root
                    bordered
                >
                    {React.createElement(viewHolder, {
                        ...props
                    })}
                </Panel.Root>
            )
        }
        return <></>
    }

    return (
        <>
            <Helmet>
                <title>{Globals.product_name} - {renderNameModule()}</title>
            </Helmet>
            <div
                className="flex flex-col gap-3"
            >
                <Panel.Root
                    bordered
                    className="h-20 flex flex-row justify-center items-center"
                >
                    <h2

                    >
                        Seja Bem vindo ao Módulo <span
                            className="font-semibold text-secundary_accent_light"
                        >{renderNameModule()}</span>
                    </h2>
                </Panel.Root>
                {renderDashboardModule()}

            </div>

        </>
    )
}