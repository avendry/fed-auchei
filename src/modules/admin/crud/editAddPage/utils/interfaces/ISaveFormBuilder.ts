import { AxiosResponse } from "axios";

export interface IOnsaveService {
    insert: () => Promise<AxiosResponse<any>>;
    update: ({ id }: { id: string | number }) => Promise<AxiosResponse<any>>;
}