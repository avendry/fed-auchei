type State = {
    loadings: string[];
}


export interface IEvent {
    callback: Function | null;
    state: any | null;
    setLoading: (loading: boolean) => void;
    onChange: (value: any) => void;
    onInit?: () => void;
    onBlur?: (value: any) => void;
    setState?: <K extends keyof State>(key: K, value: State[K]) => void;
    setFieldState?: (fieldName: string, value: any) => void;
    setFieldValue?: (fieldName: string, value: any) => void;
    setFieldProperty: (fieldName: string, property: string, value: any) => void;
    setField: (fieldName: string, properties: Array<Record<string,any>>) => void;
    setPropertie: (fieldName: string, property: string, value: any) => {formData: Record<string,any>} | null;
    pathname?: string;
}