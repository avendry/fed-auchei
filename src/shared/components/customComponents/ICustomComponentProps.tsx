export interface ICustomComponentProps {
    parentValues: Record<string,any>;
    parentId: string | number;
    onChange: (value:any) => void;
    propertyComponent: Record<string,any>;
    fieldName: string
}