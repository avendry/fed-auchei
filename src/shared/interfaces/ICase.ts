import { ReactNode } from "react";

export interface ICase <T> {
    value: T;
    children: ReactNode;
}