import { MenusDto } from "../dtos/MenusDto";
import { ModulesDto } from "../dtos/ModulesDto";
import { IgetLocalStorage } from "../interfaces/IGetLocalStorage"

export const getLocalStorage = (): IgetLocalStorage => {
    return {
        getStorageAttributes() {
            const attributes = JSON.parse(localStorage.getItem('attributes') || '{}');
            if(attributes) {
                if(attributes.menus) {
                    const { menus, modules }: {menus: MenusDto[], modules: ModulesDto[]} = attributes.menus;
                    return {
                        menus,
                        modules
                    }
                }
            }
            return null;
        },
    }
}