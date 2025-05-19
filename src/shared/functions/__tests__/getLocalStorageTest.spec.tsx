import { getLocalStorage } from "../getLocalStorage";
import { MenusDto } from "@/shared/dtos/MenusDto";
import { ModulesDto } from "@/shared/dtos/ModulesDto";


describe('getLocalStorage', () => {

    const menusMock = [
        {
            "menu_id": 3,
            "menu_name": "Cadastro de usuarios",
            "menu_icon": "fas fa-users",
            "menu_slug": "users",
            "menu_fk_module_id": 2,
            "menu_created_at": "2024-05-28T22:59:33.237Z",
            "menu_created_by": 1
        },
        {
            "menu_id": 4,
            "menu_name": "Cadastro de Clientes",
            "menu_icon": "fas fa-users",
            "menu_slug": "clients",
            "menu_fk_module_id": 2,
            "menu_created_at": "2024-05-28T22:59:33.237Z",
            "menu_created_by": 1
        }
    ]


    const modulesMock = [
        {
            "plain_module_fk_module_id": 2,
            "module_name": "Cadastros",
            "module_slug": "registrations"
        },
        {
            "plain_module_fk_module_id": 3,
            "module_name": "Vendas",
            "module_slug": "sales"
        }
    ]

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('Testa o retorno Null quando localStorage esta vazio', () => {
        // Given
        localStorage.setItem('attributes', JSON.stringify({}));

        // When
        const localStorageService = getLocalStorage();
        const result = localStorageService.getStorageAttributes();

        // Then
        expect(result).toBeNull();
    });

    it('Testa retorno null quando attributes.menus é undefined', () => {
        // Given
        const mockAttributes = { modules: [{ /* some module data */ }] };
        localStorage.setItem('attributes', JSON.stringify(mockAttributes));

        // When
        const localStorageService = getLocalStorage();
        const result = localStorageService.getStorageAttributes();

        // Then
        expect(result).toBeNull();
    });

    test('should return menus and modules from localStorage', () => {
        // Given
        const sampleMenus: MenusDto[] = menusMock;
        const sampleModules: ModulesDto[] = modulesMock;
        const mockAttributes = {menus: { menus: sampleMenus, modules: sampleModules }};
        localStorage.setItem('attributes', JSON.stringify(mockAttributes));

        // When
        const localStorageService = getLocalStorage();
        const result = localStorageService.getStorageAttributes();

        // Then
        expect(result).not.toBeNull();
        expect(result!.menus).toEqual(sampleMenus);
        expect(result!.modules).toEqual(sampleModules);
    });
});