import Axios from "@/shared/utils/Axios";
import MockAdapter from "axios-mock-adapter";
import { onSaveService } from "../onSaveService";
import axios, { AxiosInstance } from "axios";
import { ulid } from "ulid";
import { IOnsaveService } from "../../interfaces/ISaveFormBuilder";


describe("onSaveService", () => {
    let mockAxios: MockAdapter = new MockAdapter(Axios);
    const formValues = {name: "test"};
    const crud = "users";
    const uniqueId = ulid();
    let axiosInstance: AxiosInstance;
    let service: IOnsaveService;


    beforeEach(() => {
        // Cria uma instância do axios e mocka ela com axios-mock-adapter
        axiosInstance = axios.create();
        mockAxios = new MockAdapter(axiosInstance);
        service = onSaveService({formValues, crud, axiosInstance, Ulid: uniqueId});
    });

    afterEach(() => {
        // Reseta o mock após cada teste
        mockAxios.reset();
        jest.clearAllMocks();
    });

    test("testa a inserção do metodo POST", async () => {

        mockAxios.onPost(`/api/v1/${crud}/insert`).reply(200, { success: true});
        const response = await service.insert();

        expect(response.status).toBe(200);
        expect(response.data).toEqual({success: true});
    })

    test("testa o update dos dados", async () => {
        const id = 123;

        mockAxios.onPut(`/api/v1/${crud}/${id}/update`).reply(200, { success: true});

        const response = await service.update(
            {
                id
            }
        )

        expect(response.status).toBe(200)
        expect(response.data).toEqual({success: true});
        
    })
})