import { ISetExtenalFieldValue } from "./ISetExtenalFieldValue";
import { ISetFieldProperty } from "./ISetFieldProperty";
import { ISetStateProperty } from "./ISetStateProperty";

export interface ISetStateBuildForm {
    setStateProperty: ISetStateProperty,
    setExternalFieldValue: ISetExtenalFieldValue;
    setFieldProperty: ISetFieldProperty
}