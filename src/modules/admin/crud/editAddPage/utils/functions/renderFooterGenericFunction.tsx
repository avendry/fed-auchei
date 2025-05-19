import { upperFirst } from "lodash";
import * as GenericFooters from "../../genericRendersFooters/FooterHolder";
import React from "react";
import { singular } from "pluralize";
import { IRenderFooter } from "../interfaces/IRenderFooter";

export const renderFooter = (): IRenderFooter => {
    return {
        main: (params: { viewName: string, parentValues: Record<string,any>}): JSX.Element | undefined => {
            const customNameWithFooter = `${singular(upperFirst(params.viewName))}RenderFooter`;
            const footerHolder: any = GenericFooters;
            if(footerHolder[customNameWithFooter]) {
                const footerView = footerHolder[customNameWithFooter];
                return (
                    <>
                        {React.createElement(footerView, {
                            parentValues: params.parentValues
                        })}
                    </>
                )
            }
        }
    }
}