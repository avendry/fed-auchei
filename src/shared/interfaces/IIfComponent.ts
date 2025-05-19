import { ReactNode } from "react";

export interface IIfComponent<T> {
    condition: T;
    children: ReactNode
}