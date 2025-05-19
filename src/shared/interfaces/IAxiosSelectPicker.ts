export interface IAxiosSelectPicker {
    api?: string;
    onSelect?: (params: {value: string, label: string, state?: Record<string,any>}) => void;
    options: Array<{value: string, label: string}>
    valueSelected: {value: string, label: string} | null;
    initalValueId: number | null;
    fieldNameSchema: string;
    readonly: boolean;
}