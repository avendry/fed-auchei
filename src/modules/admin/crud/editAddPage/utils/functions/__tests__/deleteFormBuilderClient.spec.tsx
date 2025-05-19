import Axios from "@/shared/utils/Axios";
import { onDeleteService } from "../onDeleteService";
import MockAdapter from "axios-mock-adapter";


describe("DeleteFormBuilder", () => {


    test("teste para deletar um registro", async () => {
        const mockAxios: MockAdapter = new MockAdapter(Axios);
        const deleteForm = onDeleteService();
        const crud = "users";
        const id = 123;

        mockAxios.onDelete(`/api/v1/${crud}/${id}/delete`).reply(200, { success: true })

        const response = await deleteForm.main(
            {
                crud,
                id
            }
        );

        expect(response.status).toBe(200);
        expect(response.data).toEqual({ success: true });
    })
})