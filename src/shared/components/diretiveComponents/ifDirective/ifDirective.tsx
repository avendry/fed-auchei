import { IIfComponent } from "@/shared/interfaces/IIfComponent";

export const IfDirective = <T,>({condition, children}: IIfComponent<T>) => {
    return condition ? children : null;
}