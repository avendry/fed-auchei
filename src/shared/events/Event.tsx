import { IEvent } from "../interfaces/IEvent";


type State = {
    loadings: string[];
}

export class Event implements IEvent {
    public callback: Function | null = null;
    public parentFormValues: Record<string,any> | null = null;
    public initialParentFormValues: Record<string,any> | null = null;
    public state: any = null;
    public onChange!: (value: any) => void;
    public onDelete!: (value: any) => void;
    public onAdd?: (value: any) => void;
    public onInit?: () => void;
    public onLoad?: (formValues: Record<string,any>) => void;
    public onBlur?: (value: any) => void;
    public setState: <K extends keyof State>(key: K, value: State[K]) => void;
    public setFieldState?: (fieldName: string, value: any) => void;
    public setFieldValue: (fieldName: string, value: any) => void;
    public setFieldProperty: (fieldName: string, property: string, value: any) => void;
    public setField!: (fieldName: string, properties: Record<string, any>[]) => void;
    public setPropertie!: (fieldName: string, property: string, value: any) => { formData: Record<string, any>; } | null;
    public setLoading!: (loading: boolean) => void;
    public pathname?: string;


    constructor(
        params: {
            fieldName: string | null,
            setState: <K extends keyof State>(key: K, value: State[K]) => void;
            setFieldValue: (fieldName: string, value: any) => void;
            setFieldProperty: (fieldName: string, property: string, value: any) => void,
            parentFormValues: Record<string,any>,
            initialParentFormValues: Record<string,any>
        }
    ) {
        this.setState = params.setState;
        this.setFieldValue = params.setFieldValue;
        this.setFieldProperty = params.setFieldProperty;
        this.parentFormValues = params.parentFormValues;
        this.initialParentFormValues = params.initialParentFormValues
    }


    public setMultPropertyes (fieldName: string, properties: Record<string,any>) {
        if(properties) {
            for(const property in properties) {
                this.setFieldProperty(fieldName,property,properties[property])
            }
        }
    }
}