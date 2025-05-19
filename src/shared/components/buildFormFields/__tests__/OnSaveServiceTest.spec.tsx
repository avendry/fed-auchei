import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { OnSaveService } from '../utils/class/OnSaveService';
import { FieldsDto } from '../dtos/FieldsDto';
import { FieldErrorDto } from '../dtos/FieldErrorDto';


describe('OnSaveService', () => {
    let mockAxios: MockAdapter;
    let service: OnSaveService;
    let axiosInstance: AxiosInstance;

    beforeEach(() => {
        // Cria uma instância do axios e mocka ela com axios-mock-adapter
        axiosInstance = axios.create();
        mockAxios = new MockAdapter(axiosInstance);
        service = new OnSaveService(axiosInstance);
    });

    afterEach(() => {
        // Reseta o mock após cada teste
        mockAxios.reset();
    });

    it('deve realizar a chamada de salvar com sucesso', async () => {
        const mockData = { name: 'John Doe' };
        const mockFields: FieldsDto = {
            name: {
                type: 'text',
                browserColumn: true,
                order: 1,
                width: 100,
                required: true,
                label: 'Name'
            },
            age: {
                type: 'number',
                browserColumn: false,
                order: 2,
                width: 50,
                required: false,
                label: 'Age'
            }
        };
        const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
        const mockTable = 'users';

        // Mocka a resposta para a chamada POST
        mockAxios.onPost(`/api/v1/${mockTable}/save`).reply(200, { success: true });

        // Chama o método save
        const response = await service.insert(mockData, mockTable, mockFields, mockUuid);

        // Verifica se o axios post foi chamado corretamente
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].url).toBe(`/api/v1/${mockTable}/save`);

        // Verifica os dados que foram enviados
        expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
            transactionUuid: mockUuid,
            data: mockData
        });

        // Verifica se a resposta é a esperada
        expect(response.data.success).toBe(true);
    });

    it('deve lançar erro se a validação falhar', () => {
        const mockData = { name: 'John Doe' };
        const mockFields: FieldsDto = {
            name: {
                type: 'text',
                browserColumn: true,
                order: 1,
                width: 100,
                required: true,
                label: 'Name'
            },
            age: {
                type: 'number',
                browserColumn: false,
                order: 2,
                width: 50,
                required: false,
                label: 'Age'
            }
        };
        const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
        const mockTable = 'users';

        // Mocka o método validationFieldsValues para retornar um erro
        jest.spyOn(service, 'validationFieldsValues').mockReturnValue([{ fieldName: 'name', errorDescription: 'Invalid' }] as FieldErrorDto[]);

        // Verifica se a função lança um erro quando a validação falha
        expect(() => service.insert(mockData, mockTable, mockFields, mockUuid)).toThrow('Falha na validação dos campos');
    });
});
