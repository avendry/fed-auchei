import { MenusDto } from "./MenusDto";
import { ModulesDto } from "./ModulesDto";

export interface AttributeDto {
    menus: MenusDto[],
    modules: ModulesDto[]
}