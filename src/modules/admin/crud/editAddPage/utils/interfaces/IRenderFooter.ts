export interface IRenderFooter {
    main: (params: {viewName: string, parentValues: Record<string,any>}) => JSX.Element | undefined;
}