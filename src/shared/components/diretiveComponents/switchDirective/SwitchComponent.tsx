import { ICase } from "@/shared/interfaces/ICase";
import { ISwitch } from "@/shared/interfaces/ISwitchProps";
import React, { ReactElement } from "react";

const SwitchDiretctive = <T,>({ condition, children }: ISwitch<T>) => {
    let match: ReactElement<ICase<T>> | null = null;

    React.Children.forEach(children, (child) => {
        if(!match && React.isValidElement<ICase<T>>(child) && child.props.value === condition) {
            match = child;
        }
    })

    return match;
}

const CaseDirective = <T,>({ children }: ICase<T>) => <>{children}</>;

export {
    SwitchDiretctive,
    CaseDirective
}