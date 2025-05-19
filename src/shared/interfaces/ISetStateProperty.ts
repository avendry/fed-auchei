export interface ISetStateProperty {
    (fieldOrState: string | Record<string, any>, value?: any): void;
}