import { GetOptionsSelectHttpDto } from "../components/buildFormFields/dtos/GetOptionsSelectHttpDto";

export interface IGetOptionsSelectHttp {
    execute(getOptionsSelectHttpDto: GetOptionsSelectHttpDto): void;
}