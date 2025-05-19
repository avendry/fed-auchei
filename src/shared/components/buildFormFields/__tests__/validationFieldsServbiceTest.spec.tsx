import { IValidationFieldsService } from "../interface/IValidationFieldsService"
import { validationFieldsService } from "../utils/functions/validationFieldsService"
import { itemDataMock } from "../mocks/itemData.mock";
import fieldsMock from "../mocks/fields.mock";
import { FieldsDto } from "../dtos/FieldsDto";
import { FieldErrorDto } from "../dtos/FieldErrorDto";


describe("validationFieldsService", () => {
    const validationFieldsServiceImpl: IValidationFieldsService = validationFieldsService();

    test("Testando a passagem sem erros pelo validation", () => {
        const data = itemDataMock;
        const fields = fieldsMock;

        const result = validationFieldsServiceImpl.execute(
            data,
            fields
        )

        expect([]).toEqual(result)
    })

    test("Testando a passagem pelo validador com erro no retorno", () => {
        const data = {
            nome: ""
        };

        const fields: FieldsDto = {
            nome: {
                type: "text",
                browserColumn: true,
                order: 1,
                width: 5,
                required: true,
                label: "Nome"
            }
        };

        const expecetdErrors: FieldErrorDto[] = [
            {
                fieldName: "nome",
                errorDescription: "Nome é obrigatório!"
            }
        ]

        const result = validationFieldsServiceImpl.execute(
            data,
            fields
        );

        expect(result).toEqual(expecetdErrors);
    })
})