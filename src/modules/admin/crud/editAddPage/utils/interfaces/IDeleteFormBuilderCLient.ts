import { AxiosResponse } from "axios";


interface IParams {
    crud: string,
    id: string | number;
}


export interface IDeleteFormBuilderClient {
    main: ({crud,id}:IParams) => Promise<AxiosResponse>;
}