export interface FieldsDto {
    [key: string]: {
        type: string;
        browserColumn: boolean;
        order: number;
        width: number;
        required: boolean;
        label: string;
        readonly?: boolean;       // Opcional
        min?: number;             // Opcional
        max?: number;             // Opcional
        maskedInput?: string[];   // Opcional
        api?: string;             // Opcional
    }
}