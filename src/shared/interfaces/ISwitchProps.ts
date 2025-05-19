import { ReactElement } from "react";
import { ICase } from "./ICase";

export interface ISwitch<T> {
    condition: T;
    children: ReactElement<ICase<T>>[];
}