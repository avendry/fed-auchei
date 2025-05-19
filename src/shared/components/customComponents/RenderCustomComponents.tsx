import { ICustomComponentProps } from "./ICustomComponentProps";
import { createElement } from "react";
import clsx from "clsx";

interface Props {
    viewComponenToRender: React.ComponentType<ICustomComponentProps>;
    fieldName: string;
    formValues: Record<string, any>;
    id: string | number;
    propertyComponent: string[];
    widthClass?: string;
    isViewHtml?: string;
    onChange: (value: any) => void;
}

export const RenderCustomComponents: React.FC<Props> = ({
    viewComponenToRender,
    fieldName,
    formValues,
    propertyComponent,
    id,
    widthClass = "",
    isViewHtml = "",
    onChange
}) => {
    return (
        <fieldset className={clsx("col-span-12", widthClass, isViewHtml, "flex-col")}>
            {createElement(viewComponenToRender, {
                parentValues: formValues,
                parentId: id,
                onChange,
                propertyComponent,
                fieldName
            })}
        </fieldset>
    );
};
