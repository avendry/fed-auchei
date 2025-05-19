export interface IGridAttributes {
    items: Record<string, any>[];
    atualPage: number;
    totalItems: number;
    totalPages: number;
    perPage: number;
    fields: Record<string, any>;
    globals: Record<string, any>;
}